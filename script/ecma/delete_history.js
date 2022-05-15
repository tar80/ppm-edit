//!*script
/**
 * Delete all history in the reference
 *
 */

'use strict';

const whistory = PPx.Extract('%*editprop(whistory)').toLowerCase();
const whValue = {
  g: 'general', p: 'PPc', v: 'PPv', n: 'number', m: 'mask', s: 'search', h: 'command',
  d: 'directory', c: 'file', f: 'path', u: 'user1', x: 'user2'
}[whistory];

if (whValue === undefined) {
  PPx.Execute('%"Delete all history"%I"No history"');
  PPx.Quit(1);
} else {
  !PPx.Execute(`%"Delete all history"%Q"Delete all ${whValue}-history?"`) || PPx.Quit(1);
}

let loop = 'true';
while (loop !== '') {
  loop = PPx.Extract(`%h${whistory}0`);
  PPx.Execute(`*deletehistory ${whistory},0`);
}

PPx.SetPopLineMessage(`delete ${whistory}`);

