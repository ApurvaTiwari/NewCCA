//Don't delete this file, Matt.  Linda is using it.
function submitForm(pageValue) {
	document.forms[0].PAGE.value = pageValue;
	document.forms[0].submit();
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



// Removes all characters which appear in string bag from string s.

function stripCharsInBag (s, bag)

{   var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }

    return returnString;
}



// Removes all characters which do NOT appear in string bag
// from string s.

function stripCharsNotInBag (s, bag)

{   var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is in bag, append to returnString.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) != -1) returnString += c;
    }

    return returnString;
}



function stripWhitespace (s)

{   return stripCharsInBag (s, whitespace)
}

function charInString (c, s)
{   for (i = 0; i < s.length; i++)
    {   if (s.charAt(i) == c) return true;
    }
    return false
}



function stripInitialWhitespace (s)

{   var i = 0;

    while ((i < s.length) && charInString (s.charAt(i), whitespace))
       i++;

    return s.substring (i, s.length);
}



function isLetter (c)
{   return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) )
}



// Returns true if character c is a digit
// (0 .. 9).

function isDigit (c)
{   return ((c >= "0") && (c <= "9"))
}



// Returns true if character c is a letter or digit.

function isLetterOrDigit (c)
{   return (isLetter(c) || isDigit(c))
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

function isSignedInteger (s)

{   if (isEmpty(s))
       if (isSignedInteger.arguments.length == 1) return defaultEmptyOK;
       else return (isSignedInteger.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedInteger.arguments.length > 1)
            secondArg = isSignedInteger.arguments[1];

        // skip leading + or -
        if ( (s.charAt(0) == "-") || (s.charAt(0) == "+") )
           startPos = 1;
        return (isInteger(s.substring(startPos, s.length), secondArg))
    }
}


function isPositiveInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isPositiveInteger.arguments.length > 1)
        secondArg = isPositiveInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a positive, not negative, number

    return (isSignedInteger(s, secondArg)
         && ( (isEmpty(s) && secondArg)  || (parseInt (s) > 0) ) );
}



function isNonnegativeInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isNonnegativeInteger.arguments.length > 1)
        secondArg = isNonnegativeInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a number >= 0

    return (isSignedInteger(s, secondArg)
         && ( (isEmpty(s) && secondArg)  || (parseInt (s) >= 0) ) );
}




function isNegativeInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isNegativeInteger.arguments.length > 1)
        secondArg = isNegativeInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a negative, not positive, number

    return (isSignedInteger(s, secondArg)
         && ( (isEmpty(s) && secondArg)  || (parseInt (s) < 0) ) );
}


function isNonpositiveInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isNonpositiveInteger.arguments.length > 1)
        secondArg = isNonpositiveInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a number <= 0

    return (isSignedInteger(s, secondArg)
         && ( (isEmpty(s) && secondArg)  || (parseInt (s) <= 0) ) );
}

function isFloat (s)

{   var i;
    var seenDecimalPoint = false;

    if (isEmpty(s))
       if (isFloat.arguments.length == 1) return defaultEmptyOK;
       else return (isFloat.arguments[1] == true);

    if (s == decimalPointDelimiter) return false;

    // Search through string's characters one by one
    // until we find a non-numeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number.
        var c = s.charAt(i);

        if ((c == decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint = true;
        else if (!isDigit(c)) return false;
    }

    // All characters are numbers.
    return true;
}





function isSignedFloat (s)

{   if (isEmpty(s))
       if (isSignedFloat.arguments.length == 1) return defaultEmptyOK;
       else return (isSignedFloat.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedFloat.arguments.length > 1)
            secondArg = isSignedFloat.arguments[1];

        // skip leading + or -
        if ( (s.charAt(0) == "-") || (s.charAt(0) == "+") )
           startPos = 1;
        return (isFloat(s.substring(startPos, s.length), secondArg))
    }
}





function isAlphabetic (s)

{   var i;

    if (isEmpty(s))
       if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphabetic.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (!isLetter(c))
        return false;
    }

    // All characters are letters.
    return true;
}

// ensure's string only contains alpha, space or hyphen
function isAlphabeticSpaceHyphen (s)

{   var i;

    if (isEmpty(s))
       if (isAlphabeticSpaceHyphen.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphabeticSpaceHyphen.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (! (isLetter(c)|| c == ' ' || c=='-'))
        return false;
    }

    // All characters are letters.
    return true;
}


// ensure's string only contains alpha, digit, dot, space or hyphen
/*
function isAlphanumericSpaceHyphenDot (s)

{   var i;

    if (isEmpty(s))
       if (isAlphabeticSpaceHyphen.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphabeticSpaceHyphen.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (! (isDigit(c) || isLetter(c) || c == ' ' || c=='-' || c=='.'))
        return false;
    }

    // All characters are letters.
    return true;
}
*/

function isAlphanumeric (s)

{   var i;

    if (isEmpty(s))
       if (isAlphanumeric.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphanumeric.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphanumeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
        // Check that current character is number or letter.
        var c = s.charAt(i);

        if (! (isLetter(c) || isDigit(c) ) )
        return false;
    }

    // All characters are numbers or letters.
    return true;
}


function reformat (s)

{   var arg;
    var sPos = 0;
    var resultString = "";

    for (var i = 1; i < reformat.arguments.length; i++) {
       arg = reformat.arguments[i];
       if (i % 2 == 1) resultString += arg;
       else {
           resultString += s.substring(sPos, sPos + arg);
           sPos += arg;
       }
    }
    return resultString;
}

function isSSN (s)
{   if (isEmpty(s))
       if (isSSN.arguments.length == 1) return defaultEmptyOK;
       else return (isSSN.arguments[1] == true);
    return (isInteger(s) && s.length == digitsInSocialSecurityNumber)
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
{  if (isEmpty(s))
       if (isZIPCode.arguments.length == 1) return defaultEmptyOK;
       else return (isZIPCode.arguments[1] == true);
   return (isInteger(s) &&
            ((s.length == digitsInZIPCode1) ||
             (s.length == digitsInZIPCode2)))
}



function isStateCode(s)
{   if (isEmpty(s))
       if (isStateCode.arguments.length == 1) return defaultEmptyOK;
       else return (isStateCode.arguments[1] == true);
    return ( (USStateCodes.indexOf(s) != -1) &&
             (s.indexOf(USStateCodeDelimiter) == -1) )
}


function isEmail (s)
{   if (isEmpty(s))
       if (isEmail.arguments.length == 1) return defaultEmptyOK;
       else return (isEmail.arguments[1] == true);

    // is s whitespace?
    if (isWhitespace(s)) return false;
    
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

function isYear (s)
{   if (isEmpty(s))
       if (isYear.arguments.length == 1) return defaultEmptyOK;
       else return (isYear.arguments[1] == true);
    if (!isNonnegativeInteger(s)) return false;
    return ((s.length == 4));
}



function isIntegerInRange (s, a, b)
{
   if (isEmpty(s))
       if (isIntegerInRange.arguments.length == 1) return defaultEmptyOK;
       else return (isIntegerInRange.arguments[1] == true);

    // Catch non-integer strings to avoid creating a NaN below,
    // which isn't available on JavaScript 1.0 for Windows.

    //alert(isInteger(s, false));

    if (!isInteger(s, false)) return false;
    var s2 = "";

    for (var i=0; i<s.length; i++) {
       if (i>0 || s.charAt(i) > 0)  s2 = s2 + s.charAt(i);
    }

    // Now, explicitly change the type to integer via parseInt
    // so that the comparison code below will work both on
    // JavaScript 1.2 (which typechecks in equality comparisons)
    // and JavaScript 1.1 and before (which doesn't).
    var num = parseInt (s2);
    return ((num >= a) && (num <= b));
}

function isMonth (s)
{   if (isEmpty(s))
       if (isMonth.arguments.length == 1) return defaultEmptyOK;
       else return (isMonth.arguments[1] == true);
    return isIntegerInRange (s, 1, 12);
}

function isDay (s)
{
    if (isEmpty(s))
       if (isDay.arguments.length == 1) return defaultEmptyOK;
       else return (isDay.arguments[1] == true);

    return isIntegerInRange (s, 1, 31);
}



function daysInFebruary (year)
{   // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (  ((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0) ) ) ? 29 : 28 );
}

function isDate (year, month, day)
{   // catch invalid years (not 2- or 4-digit) and invalid months and days.
   var DayArray   = new Array( 31,   28,   31,   30,   31,   30,   31,   31,   30,   31,   30,   31)

   if (! (isYear(year, false) && isMonth(month, false) && isDay(day, false))) return false;

    // Explicitly change type to integer to make code work in both
    // JavaScript 1.1 and JavaScript 1.2.
    var intYear = parseInt(year);
    var intMonth = parseInt(month);
    var intDay = parseInt(day);

    /* Check For Leap Year */
     if ( ( intYear%4 == 0 && intYear%100 != 0 ) || ( intYear%400 == 0 ) )
     {
       DayArray[1] = 29;
     }

     // catch invalid days, except for February
    if (intDay > DayArray[intMonth-1]) return false;

    return true;
}


/* FUNCTIONS TO NOTIFY USER OF INPUT REQUIREMENTS OR MISTAKES. */



function prompt (s)
{   window.status = s
}




function promptEntry (s)
{   window.status = pEntryPrompt + s
}




function warnEmpty (theField, s)
{   theField.focus()
    alert(mPrefix + s + mSuffix)
    return false
}


function warnInvalid (theField, s)
{   theField.focus()
    theField.select()
    alert(s)
    return false
}



function checkString (theField, s, emptyOK)
{   // Next line is needed on NN3 to avoid "undefined is not a number" error
    // in equality comparison below.
    if (checkString.arguments.length == 2) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
        if (isWhitespace(theField.value))
       return warnEmpty (theField, s);
    else {
if((s ==sUSFirstName)||(s ==sUSLastName)||(s ==sUSMiddleName)){
if(! isAlphabeticSpaceHyphen(theField.value)){
alert("Only A-Z allowed in the "+s+" field");
return false;
}
}
}
return true;
}

function checkStateCode (theField, emptyOK)
{   if (checkStateCode.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else
    {  theField.value = theField.value.toUpperCase();
       if (!isStateCode(theField.value, false))
          return warnInvalid (theField, iStateCode);
       else return true;
    }
}


function reformatZIPCode (ZIPString)
{   if (ZIPString.length == 5) return ZIPString;
    else return (reformat (ZIPString, "", 5, "-", 4));
}



function checkZIPCode (theField, emptyOK)
{   if (checkZIPCode.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else
    { var normalizedZIP = stripCharsInBag(theField.value, ZIPCodeDelimiters)
      if (!isZIPCode(normalizedZIP, false))
         return warnInvalid (theField, iZIPCode);
      else
      {  // if you don't want to insert a hyphen, comment next line out
//         theField.value = reformatZIPCode(normalizedZIP)
         return true;
      }
    }
}




function reformatUSPhone (USPhone)
{   return (reformat (USPhone, "(", 3, ") ", 3, "-", 4))
}



function checkUSPhone (theField, emptyOK)
{   if (checkUSPhone.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else
    {  var normalizedPhone = stripCharsInBag(theField.value, phoneNumberDelimiters)
       if (!isUSPhoneNumber(normalizedPhone, false))
          return warnInvalid (theField, iUSPhone);
       else
       {  // if you don't want to reformat as (123) 456-789, comment next line out
          theField.value = reformatUSPhone(normalizedPhone)
          return true;
       }
    }
}




function checkInternationalPhone (theField, emptyOK)
{   if (checkInternationalPhone.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else
    {  if (!isInternationalPhoneNumber(theField.value, false))
          return warnInvalid (theField, iWorldPhone);
       else return true;
    }
}


function checkEmail (theField, emptyOK)
{   if (checkEmail.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else if (!isEmail(theField.value, false))
       return warnInvalid (theField, iEmail);
    else return true;
}


function reformatSSN (SSN)
{   return (reformat (SSN, "", 3, "-", 2, "-", 4))
}



function checkSSN (theField, emptyOK)
{   if (checkSSN.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else
    {  var normalizedSSN = stripCharsInBag(theField.value, SSNDelimiters)
       if (!isSSN(normalizedSSN, false))
          return warnInvalid (theField, iSSN);
       else
       {  // if you don't want to reformats as 123-456-7890, comment next line out
          theField.value = reformatSSN(normalizedSSN)
          return true;
       }
    }
}
function checkFEDID (theField, emptyOK)
{   if (checkFEDID.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    else
    {  var normalizedSSN = stripCharsInBag(theField.value, SSNDelimiters)
       if (!isSSN(normalizedSSN, false))
          return warnInvalid (theField, iSSN);
       else
       {  // if you don't want to reformats as 123-456-7890, comment next line out
         // theField.value = reformatSSN(normalizedSSN)
          return true;
       }
    }
}



function checkYear (theField, emptyOK)
{   if (checkYear.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    if (!isYear(theField.value, false))
       return warnInvalid (theField, iYear);
    else return true;
}


function checkMonth (theField, emptyOK)
{   if (checkMonth.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    if (!isMonth(theField.value, false))
       return warnInvalid (theField, iMonth);
    else return true;
}


function checkDay (theField, emptyOK)
{   if (checkDay.arguments.length == 1) emptyOK = defaultEmptyOK;
    if ((emptyOK == true) && (isEmpty(theField.value))) return true;
    if (!isDay(theField.value, false))
       return warnInvalid (theField, iDay);
    else return true;
}


function checkDate (yearField, monthField, dayField, labelString, OKtoOmitDay)
{   // Next line is needed on NN3 to avoid "undefined is not a number" error
    // in equality comparison below.
    if (checkDate.arguments.length == 4) OKtoOmitDay = false;
    if (!isYear(yearField.value)) return warnInvalid (yearField, iYear);
    if (!isMonth(monthField.value)) return warnInvalid (monthField, iMonth);
    if ( (OKtoOmitDay == true) && isEmpty(dayField.value) ) return true;
    else if (!isDay(dayField.value))
       return warnInvalid (dayField, iDay);
    if (isDate (yearField.value, monthField.value, dayField.value))
       return true;
    alert (iDatePrefix + labelString + iDateSuffix)
    return false
}

// date must be in mm/d/y format (uses slashes to determine fields)
function checkDateAsString(dateField, labelString, formatMsg, yearMsg, monthMsg, dayMsg, dateMsg)
{
   date = dateField.value;
   firstSlash = date.indexOf('/');
   lastSlash = date.lastIndexOf('/');
   if (firstSlash == lastSlash) {
      warnInvalid(dateField, labelString + ": " + formatMsg);
      return false;
   }
   month = date.substring(0,firstSlash);
   day = date.substring(firstSlash+1, lastSlash);
   year = date.substring(lastSlash+1, date.length);


  if (!isYear(year)) {
                 return warnInvalid (dateField, labelString + ": " + yearMsg);
   }

   if (!isMonth(month)) {
                return warnInvalid (dateField, labelString + ": " + monthMsg);
   }
   else if (!isDay(day)) {
      return warnInvalid (dateField, labelString + ": " + dayMsg);
          }
   if (isDate (year, month, day)) {
      return true;
   } else {
      return warnInvalid(dateField, labelString + ": " + dateMsg);
   }
   return false;

}

//return a Date object setting by the date,hour,minute, isAM boolean value
//exampel:  myDate = getDateObj("04/19/2001", 12, 0, true);

function getDateObj(strDate, strHr, strMin, isAM) {
    DT = new Date(strDate);

    if (isAM) {
         if (strHr==12) strHr = 0;
    } else {
         if (strHr < 12) strHr = 12 + parseInt(strHr);
    }

    DT.setHours(strHr);
    DT.setMinutes(strMin);
    return DT;
}
function validLocation(strString)
   //  check for valid numeric strings	
   {
  
   //var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;

   if (strString.length == 0) return false;

   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
      {
      strChar = strString.charAt(i);
      //if (strValidChars.indexOf(strChar) == -1)
      if (! (isLetter(strChar) || isDigit(strChar) ) )
         {
         blnResult = false;
         }
      }
    // look for @
    if (strString.length != 6 )
    { blnResult = false;
    }
   return blnResult;
   }

function checkUniqueLocationCode(locationCode,packageId,cmdFrom) {

var url = '/CommonReg?cmd=VALIDATE_COMPANY_LOCATION_CODE';
var unique = false; 
		var ajax = new Ajax.Request(url,
		       {
		            method: 'post', asynchronous:false,
		            onSuccess: function(transport){
		                       var text = transport.responseText;
		                        unique = text;
		                        
		            },
		            parameters: { pkgId : packageId , locationCode : locationCode , cmdFrom : cmdFrom}, 
		            onFailure: function(){ alert('Could not validate location code')  },
		            onException: function(obj, exception){ alert('Sorry, could not validate location code');  }
		        }
		        
		      );
	if(unique == 'true'){
		unique = true;
	}else{
		unique = false;
	}
	
return unique;
}

function getSponsorList(globalCovisintPackageId) {

var url = '/CommonReg/secured?cmd=PACKAGE_SPONSORS';
var sponsors = ''; 
		var ajax = new Ajax.Request(url,
		       {
		            method: 'post', asynchronous:false,
		            onSuccess: function(transport){
		                       var text = transport.responseText;
		                        sponsors = text;
		                        
		            },
		            parameters: { globalCovisintPackageId : globalCovisintPackageId}, 
		            onFailure: function(){ alert('Could not get sponsors')  },
		            onException: function(obj, exception){ alert('Sorry, could not get sponsors');  }
		        }
		        
		      );
return sponsors;
}

function getOnlyPracticeSecurityAdminforCompany() {


var url = '/CommonReg?cmd=FIND_PRACTICE_ONLY_ID';
var unique = ''; 
		var ajax = new Ajax.Request(url,
		       {
		            method: 'post', asynchronous:false,
		            onSuccess: function(transport){
		                       var text = transport.responseText;
		                        unique = text;
		                        
		                        
		            },
		            parameters: { }, 
		            onFailure: function(){ alert('Could not validate location code')  },
		            onException: function(obj, exception){ alert('Sorry, could not validate location code');  }
		        }
		        
		      );
		      	
return unique;
}