//!*script
/**
 * Delete all history in the reference
 *
 */

var whistory = PPx.Extract('%*editprop(whistory)').toLowerCase();
var whValue = {
  g: 'general', p: 'PPc', v: 'PPv', n: 'number', m: 'mask', s: 'search', h: 'command',
  d: 'directory', c: 'file', f: 'path', u: 'user1', x: 'user2'
}[whistory];

if (typeof whValue === 'undefined') {
  PPx.Execute('%"Delete all history"%I"No history"');
  PPx.Quit(1);
} else {
  !PPx.Execute('%"Delete all history"%Q"Delete all ' + whValue + '-history?"') || PPx.Quit(1);
}

var loop = 'true';
while (loop !== '') {
  loop = PPx.Extract('%h' + whistory + '0');
  PPx.Execute('*deletehistory ' + whistory + ',0');
}

PPx.SetPopLineMessage('delete ' + whistory);

