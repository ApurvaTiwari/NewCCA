/*
 * @class PWPolicyCheck {Object} Allows user to add policies to a password field and to associate the policies
 *      with Dom elements and strength meters.
 * @constructor
 *
 * @param form {HTMLInput|String} Form element DOM element or jQuery selector of password/login form.
 *
 * @param field {HTMLInput|String} Password field DOM element or jQuery selector whose "onkeyup" and "focusin" events will be monitored.
 *
 * @param policies {Array} An array of policy objects that will be tested agains the password.  Each policy object must
 *      have a "regex" attribute and "el" attribute. Optionally, a boolean "result" attribute (defaults to true) can
 *      be specified which defines what the expected result of the regex test should be to be considered valid. The
 *      regex will be tested via "regex.test(password)", which will be compared to the "result". Finally, an optional
 *      "cls" attribute (defaults to "valid") can be defined and will be toggled on the provided el based on whether
 *      the regex has validated or not. Default is no policies (ie []).
 *      Example of an array of policies:
 *      [
 *          {regex: /.{8,}/, result: true, el: <HTMLElement>, cls: "valid" },   // length >= 8
 *          {regex: /[a-z]/i, result: true, el: <HTMLElement>, cls: "valid" },  // Must contain at least one alpha character
 *          {regex: /[\W_]/, result: true, el: <HTMLElement>, cls: "valid" },   // Must contain one symbol
 *          {regex: /^\d/, result: false, el: <HTMLElement>, cls: "valid" }     // Cannot start with a number
 *      ]
 *
 */
var PWPolicyCheck;

(function($) {

	PWPolicyCheck = function(form, field, policies) {

		this.form = $(form);
		this.field = $(field);
		this.policies = [];

		policies = policies || [];

		var p, i, ln;

		// validate the form element
		if (this.form.length < 1) {
			throw {
				name : "TypeError",
				message : "Invalid form element"
			};
		}
		// validate the field element 
		if (this.field.length < 1) {
			throw {
				name : "TypeError",
				message : "Invalid password field element"
			};
		}
		var retype = false;
		var passwordId = $(this.field).attr("id")
		if (passwordId == "pass2") {
			retype = true;
		}
		for (i = 0, ln = policies.length; i < ln; ++i) {

			this.policies[this.policies.length] = new Policy(policies[i],
					retype);
		}

		this.field.bind("focusin keyup", curry(this.validate, this));

	};

	PWPolicyCheck.prototype = {
		field : null,
		form : null,
		policies : null,

		validate : function() {
			var i = 0, p = this.policies, ln = p.length, pw = this.field.val(), fvals = this.form
					.serialize();

			for (; i < ln; ++i) {
				p[i].validate(pw, fvals);
			}
		}

	};

	/**
	 * @class Policy
	 * @constructor
	 * @param opts {Object} Configuration options for the Policy object.
	 *      @config el {String|Object} The 
	 */
	var Policy = function(opts, retype) {
		if (typeof opts !== "object") {
			throw {
				name : "TypeError",
				message : "Invalid policy configuration object"
			};
		}

		var element = opts.el;
		if (element.startsWith("#")) {
			this.el = $(opts.el);
		} else {
			if (retype) {
				this.el = $('#' + "pw_" + opts.el);
			} else {
				this.el = $('#' + opts.el);
			}

		}

		if (this.el.length < 1) {
			throw {
				name : "TypeError",
				message : "Invalid policy element specified: " + opts.el
			};
		}

		if (opts.field) {
			this.field = $(opts.field);
			if (this.field.length < 1) {
				throw {
					name : "TypeError",
					message : "Invalid policy field specified: " + opts.field
				};
			}
		}

		if (opts.fieldPwd) {
			this.fieldPwd = $(opts.fieldPwd);
			if (this.fieldPwd.length < 1) {
				throw {
					name : "TypeError",
					message : "Invalid policy field specified: "
							+ opts.fieldPwd
				};
			}
		}

		this.regex = opts.regex;
		this.regexExec = opts.regexExec;
		if (typeof opts.result == "boolean" && opts.result !== this.result) {
			this.result = !this.result
		}
		if (typeof opts.cls == "string") {
			this.cls = opts.cls
		}
		if (opts.cmd) {
			var cmdValue="password_policy_tooltip_validator";
			if(opts.cmd.ajaxURLKey){
				cmdValue=opts.cmd.ajaxURLKey;
			}
			
			var ruleId = opts.el;
			if (ruleId.startsWith("pw_")) {
				ruleId = ruleId.replace("pw_", "");
			}
			this.ajax = $.extend({
				url : "/CommonReg",
				dataType : "json",
				type : "POST",
				data : {
					"rule_id" : ruleId,
					"cmd" : cmdValue
				},
				context : this,
				success : function(data, textStatus, jqXHR) {
					this.toggleClass((data && data.success === true));
				},
				complete : function() {
					this.xhr = null;
				}
			}, opts.ajax);
		}

	};

	Policy.prototype = {
		el : null,
		result : true,
		cls : "valid",
		regex : null,
		regexExec : null,
		field : null,
		fieldPwd : null,
		ajax : null,
		xhr : null,

		validate : function(pw, fvals) {
			var data;
			if (pw.length < 2) {
				this.toggleClass(false);
			} else if (this.ajax) {
				if (this.xhr) {
					this.xhr.abort();
				}
				// data = $.extend( paramToObject(fvals),
				// paramToObject(this.ajax.data) );
				//see if command is not right
				data = copyFormValsToData(fvals, this.ajax.data);
				data["password"] = pw;
				this.xhr = $.ajax($.extend({}, this.ajax, {
					data : data
				}));
			} else if (this.regex) {
				this.toggleClass(this.regex.test(pw) === this.result);
			} else if (this.regexExec) {
				var allowedStr = '';
				for ( var i = 0; i < pw.length; i++) {
					var pwdChar = this.regexExec.exec(pw.charAt(i));
					if (pwdChar != null) {
						allowedStr = allowedStr + pwdChar;
					}
				}
				this.toggleClass((allowedStr === pw) === this.result);
			} else if (this.field) {
				this.toggleClass((this.field.val().toLowerCase() === pw
						.toLowerCase()) === this.result);
			} else if (this.fieldPwd) {
				this.toggleClass((this.fieldPwd.val() === pw) === this.result);
			}
		},

		toggleClass : function(test) {
			if (test) {
				this.el.addClass(this.cls);
			} else {
				this.el.removeClass(this.cls);
			}
		}

	};

	function copyFormValsToData(fvals, data) {
		if (typeof fvals !== "string") {
			return {};
		}

		var i = 0, p = fvals.split("&"), ln = p.length, nv, nm, val, obj = {};

		for (; i < ln; ++i) {
			nv = p[i].split("=");
			nm = decodeURIComponent(nv[0]);
			val = decodeURIComponent(nv[1]);
			//patch code start...
			if (nm == "cmd") {
				continue;
			}

			data[nm] = val;

		}
		return data;

	}

	function curry(fn, scope, args) {
		return function() {
			fn.apply(scope || this, Array.prototype.slice.call(arguments)
					.concat(args || []));
		};

	}
	; // -- eo curry function

})(jQuery);

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

if (typeof String.prototype.startsWith != 'function') {
	// see below for better implementation!
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}

/**
 * Function.curry
 * Augment the Function object with curry() method to generate closures with pre-defined scope and arguments.
 *
 * @param fn {Function} The function to be called when the closure function is invoked.
 * @param scope {Object} What the value of "this" will be when the function is called.
 *          Default is the Window object.
 * @param args {Array} An array of arguments to be passed to fn when it is invoked.
 *
 * @return {Function} A function that, when called, will be called in the pre-defined scope and
 *          with the pre-defined arguments.

 if(!Function.curry) {
 Function.curry = function (fn, scope, args) {
 return function ( ) {
 fn.apply(scope||this, Array.prototype.slice.call(arguments).concat(args||[]));
 };

 }; // -- eo curry method
 }
 */
