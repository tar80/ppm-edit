//!*script
// deno-lint-ignore-file no-var
/**
 * Delete all currently referenced histories
 *
 */

var whistory = PPx.Extract('%*editprop(whistory)').toLowerCase();
var whValue = {
  g: 'general',
  p: 'PPc',
  v: 'PPv',
  n: 'number',
  m: 'mask',
  s: 'search',
  h: 'command',
  d: 'directory',
  c: 'file',
  f: 'path',
  u: 'user1',
  x: 'user2'
}[whistory];

var warn = function (msg) {
  return PPx.Execute('%"Delete all histories"' + msg);
};

if (typeof whValue === 'undefined') {
  warn('%I"No histories"');
  PPx.Quit(1);
} else {
  !warn('%Q"Delete all ' + whValue + '-history?"') || PPx.Quit(1);
}

var loop = 'true';
while (loop !== '') {
  loop = PPx.Extract('%h' + whistory + '0');
  PPx.Execute('*deletehistory ' + whistory + ',0');
}

PPx.SetPopLineMessage('All ' + whValue + '-history deleted');
