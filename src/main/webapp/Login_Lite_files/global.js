

// whitespace characters
var whitespace = " \t\n\r";


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



