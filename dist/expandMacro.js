﻿var hasArg=function(t){return 0!==PPx.Arguments.length&&PPx.Argument(0)===t},isEmptyStr=function(t){return""===t};(function(){var t=hasArg("1"),x=PPx.Extract("%*selecttext"),e="";0===x.indexOf("%")?e=PPx.Extract(x):0===x.indexOf("u")?e=PPx.Extract("%b"+x.substring(1)):0===x.indexOf("x")&&(e=PPx.Extract("%b"+x)),isEmptyStr(e)||(t?PPx.linemessage(e):PPx.Execute("*insert "+e))})();
