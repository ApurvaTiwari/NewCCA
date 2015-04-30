

function covisintHelp(heading, message) {
    var fullHTML ="<table width='148' border='0' cellspacing='0' cellpadding='0'>"
				+ "  <tr><td width='129'><img src='/images/rollover_top.gif.gif' width='129' height='24'></td>"
				+ "    <td><a href='javascript:cClick();'><img src='/images/rollover_close.gif.gif' width='19' height='24' border=0></a></td>"
				+ "</tr></table>"
				+ "<table width='148' border='0' cellspacing='0' cellpadding='0'>"
				+ "  <tr><td width='6' height='100%' background='/images/rollover_leftEdge.gif.gif'><img src='/images/spacer.gif' width='6'></td>"
				+ "    <td width='3' bgcolor='#ffffff'><img src='/images/spacer.gif' width='3'></td>"
				+ "    <td width='131' nowrap valign='top' bgcolor='#ffffff'>"
				+ "      <span  class='tableContentBold'>" + heading + "</span>"
				+ "      <hr noshade size='1'><img src='/images/icon_help2.gif.gif' width='31' height='29' align='left' hspace='5'>"
				+ "      <span class='tableContent'>" + message + "</span></td>"
				+ "    <td width='3' bgcolor='#ffffff'><img src='/images/spacer.gif' width='3'></td>"
				+ "    <td width='5' background='/images/rollover_rgtEdge.gif.gif'><img src='/images/spacer.gif' width='5'></td></tr>"
				+ "  <tr><td colspan='5' height='8'><img src='/images/rollover_bottom.gif.gif' width='148' height='8' vspace='0' hspace='0'></td>"
				+ "</tr></table>";
    overlib(fullHTML, FULLHTML, WIDTH, 150, STICKY, DELAY, 300, LEFT, BELOW, OFFSETY, -10);
}


function covisintHelpWide(heading, message) {
    var fullHTML ="<table width='296' border='0' cellspacing='0' cellpadding='0'>"
				+ "  <tr><td width='277'><img src='/images/rollover_top_long.gif' width='277' height='24'></td>"
				+ "    <td><a href='javascript:cClick();'><img src='/images/rollover_close.gif.gif' width='19' height='24' border=0></a></td>"
				+ "</tr></table>"
				+ "<table width='296' border='0' cellspacing='0' cellpadding='0'>"
				+ "  <tr><td width='6' height='100%' background='/images/rollover_leftEdge.gif.gif'><img src='/images/spacer.gif' width='6'></td>"
				+ "    <td width='3' bgcolor='#ffffff'><img src='/images/spacer.gif' width='3'></td>"
				+ "    <td width='279' nowrap valign='top' bgcolor='#ffffff'>"
				+ "      <span  class='tableContentBold'>" + heading + "</span>"
				+ "      <hr noshade size='1'><img src='/images/icon_help2.gif.gif' width='31' height='29' align='left' hspace='5'>"
				+ "      <span class='tableContent'>" + message + "</span></td>"
				+ "    <td width='3' bgcolor='#ffffff'><img src='/images/spacer.gif' width='3'></td>"
				+ "    <td width='5' background='/images/rollover_rgtEdge.gif.gif'><img src='/images/spacer.gif' width='5'></td></tr>"
				+ "  <tr><td colspan='5' height='8'><img src='/images/rollover_bottom_long.gif' width='296' height='8' vspace='0' hspace='0'></td></tr>"
				+ "</table>";
    overlib(fullHTML, FULLHTML, WIDTH, 300, STICKY, DELAY, 300, LEFT, BELOW, OFFSETY, -10);
}

//
// walk around to the problem that the select element in a form is displayed on the top of the help pop-up
// is used by editProfile.jsp
//
function covisintHelp(heading, message, xPosition, yPosition) {
    var fullHTML ="<table width='148' border='0' cellspacing='0' cellpadding='0'>"
				+ "  <tr><td width='129'><img src='/images/rollover_top.gif.gif' width='129' height='24'></td>"
				+ "    <td><a href='javascript:cClick();'><img src='/images/rollover_close.gif.gif' width='19' height='24' border=0></a></td>"
				+ "</tr></table>"
				+ "<table width='148' border='0' cellspacing='0' cellpadding='0'>"
				+ "  <tr><td width='6' height='100%' background='/images/rollover_leftEdge.gif.gif'><img src='/images/spacer.gif' width='6'></td>"
				+ "    <td width='3' bgcolor='#ffffff'><img src='/images/spacer.gif' width='3'></td>"
				+ "    <td width='131' nowrap valign='top' bgcolor='#ffffff'>"
				+ "      <span  class='tableContentBold'>" + heading + "</span>"
				+ "      <hr noshade size='1'><img src='/images/icon_help2.gif.gif' width='31' height='29' align='left' hspace='5'>"
				+ "      <span class='tableContent'>" + message + "</span></td>"
				+ "    <td width='3' bgcolor='#ffffff'><img src='/images/spacer.gif' width='3'></td>"
				+ "    <td width='5' background='/images/rollover_rgtEdge.gif.gif'><img src='/images/spacer.gif' width='5'></td></tr>"
				+ "  <tr><td colspan='5' height='8'><img src='/images/rollover_bottom.gif.gif' width='148' height='8' vspace='0' hspace='0'></td>"
				+ "</tr></table>";
    overlib(fullHTML, FULLHTML, WIDTH, 150, STICKY, DELAY, 300, FIXX, xPosition, FIXY, yPosition);
}
