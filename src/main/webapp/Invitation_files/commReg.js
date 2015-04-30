
function submitForm(pageValue) {
	document.forms[0].PAGE.value = pageValue;
	document.forms[0].submit();
}

function findSelection(s, val) {
	for (i = 0; i < s.options.length; i++) {
		if (s.options[i].value == val) {
			s.options[i].selected = true;
		}
	}
}

/********* Form validation functions ***********/


var defaultEmptyOK = false;
var validZIPCodeChars = digits + ZIPCodeDelimiters;

// U.S. ZIP codes have 5 or 9 digits.
// They are formatted as 12345 or 12345-6789.
var digitsInZIPCode1 = 5;
var digitsInZIPCode2 = 4;

// VARIABLE DECLARATIONS

var digits = "0123456789";
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


// whitespace characters
var whitespace = " \t\n\r";

// decimal point character differs by language and culture
var decimalPointDelimiter = "."

// non-digit characters which are allowed in phone numbers
var phoneNumberDelimiters = "()- ";

// characters which are allowed in US phone numbers
var validUSPhoneChars = digits + phoneNumberDelimiters;

// characters which are allowed in international phone numbers
// (a leading + is OK)
var validWorldPhoneChars = digits + phoneNumberDelimiters + "+";

// U.S. phone numbers have 10 digits.
// They are formatted as 123 456 7890 or (123) 456-7890.
var digitsInUSPhoneNumber = 10;

// non-digit characters which are allowed in ZIP Codes
var ZIPCodeDelimiters = "-";

// our preferred delimiter for reformatting ZIP Codes
var ZIPCodeDelimeter = "-"

// Check whether string s is empty.
function isEmpty(s)
{   return ((s == null) || (s.length == 0))
}


// Returns true if string s is empty or 
// whitespace characters only.

function isWhitespace (s)

{   var i;

    // Is s empty?
    if (isEmpty(s)) return true;

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);

        if (whitespace.indexOf(c) == -1) return false;
    }

    // All characters are whitespace.
    return true;
}


function isLetter (c)
{   return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) )
}

// Returns true if character c is a digit 
// (0 .. 9).

function isDigit (c)
{   return ((c >= "0") && (c <= "9"))
}

function isInteger (s)

{   var i;

    if (isEmpty(s)) 
       if (isInteger.arguments.length == 1) return defaultEmptyOK;
       else return (isInteger.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-numeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {   
        // Check that current character is number.
        var c = s.charAt(i);

        if (!isDigit(c)) return false;
    }

    // All characters are numbers.
    return true;
}


// see comments of function isInteger.

function isUSPhoneNumber (s)
{   if (isEmpty(s)) 
       if (isUSPhoneNumber.arguments.length == 1) return defaultEmptyOK;
       else return (isUSPhoneNumber.arguments[1] == true);
    return (isInteger(s) && s.length == digitsInUSPhoneNumber)
}

function isInternationalPhoneNumber (s)
{   if (isEmpty(s)) 
       if (isInternationalPhoneNumber.arguments.length == 1) return defaultEmptyOK;
       else return (isInternationalPhoneNumber.arguments[1] == true);
    return (isPositiveInteger(s))
}

function isZIPCode (s)
{	if (isEmpty(s)) {
		if (isZIPCode.arguments.length == 1)
			return defaultEmptyOK;
		else
			return (isZIPCode.arguments[1] == true);
	}

	return (isInteger(s) && ((s.length == digitsInZIPCode1) || (s.length == digitsInZIPCode2)));
}

function isEmail (s)
{  

 if (isEmpty(s)) {
       if (isEmail.arguments.length == 1) return defaultEmptyOK;
       else return (isEmail.arguments[1] == true);
   }
    // is s whitespace?
    if (isWhitespace(s)) return false;
    
    // does it contain more than 1 @
    if (s.indexOf("@") != s.lastIndexOf("@")) {
    	return false;
    }
    
    for (var k=0; k<s.length; k++) {
    	// does it has 2 dots consecutively
    	if (s.charAt(k) == "." && s.charAt(k+1) == ".") {
    		return false;
    	}
    	// does it has a dot right after @
    	if (s.charAt(k) == "@" && s.charAt(k+1) == ".") {
    		return false;
    	}
    }
    
    
    // there must be >= 1 character before @, so we
    // start looking at character position 1 
    // (i.e. second character)
    var i = 1;
    var sLength = s.length;

    // look for @
    while ((i < sLength) && (s.charAt(i) != "@"))
    { i++
    }

    if ((i >= sLength) || (s.charAt(i) != "@")) return false;
    else i += 2;

    // look for .
    while ((i < sLength) && (s.charAt(i) != "."))
    { i++
    }

    // there must be at least one character after the .
    if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
    else return true;
}

function isWronglyFormattedEmailAddress (s) {
	if (isEmail(s) == false) {  
		return true;
	} else {
		// the code value for '@' is 64, '_' is 95, '-' is 45, '.' is 46,
		// '0' is 48, '9' is 57, 'A' is 65, 'Z' is 90, 'a' is 97, 'z' is 122 
		// ''' is 39 (apostrophe)
		for (k=0; k<s.length; k++) {
			if ((s.charCodeAt(k) < 48 && s.charCodeAt(k) != 46 && s.charCodeAt(k) != 45 && s.charCodeAt(k) != 39)|| 
				(s.charCodeAt(k) > 57 && s.charCodeAt(k) < 64) ||
				(s.charCodeAt(k) > 90 && s.charCodeAt(k) < 97 && s.charCodeAt(k) != 95) ||
				(s.charCodeAt(k) > 122)) {
				return true;
			}
		}
		return false;
	}
}


/*
<TEXTAREA NAME="aTextArea" ROWS="2" COLS="10" WRAP="soft"
          ONKEYDOWN="return checkMaxLength(this, event, 20)"
          ONSELECT="storeSelection(this)"
></TEXTAREA>
*/

// check the maxlength of TEXTAREA
function checkMaxLength (textarea, evt, maxLength) {
  if (textarea.selected && evt.shiftKey) 
    // ignore shift click for select
    return true;
  var allowKey = false;
  if (textarea.selected && textarea.selectedLength > 0)
    allowKey = true;
  else {
    var keyCode = 
      document.layers ? evt.which : evt.keyCode;
    if (keyCode < 32 && keyCode != 13)
      allowKey = true;
    else if (keyCode == 46 || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
      allowKey = true;
    else           
      allowKey = textarea.value.length < maxLength;
  }
  textarea.selected = false;
  return allowKey;
}


// check the maxlength of TEXTAREA
function storeSelection (field) {
  if (document.all) {
    field.selected = true;
    field.selectedLength = 
      field.createTextRange ?
        document.selection.createRange().text.length : 1;
  }
}
