﻿//!*script
/**
 * Delete all currently referenced history
 *
 */

'use strict';

const whistory = PPx.Extract('%*editprop(whistory)').toLowerCase();
const wh_value = {
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

const warn = (msg) => PPx.Execute(`%"Delete all histories"${msg}`);

if (wh_value === undefined) {
  warn('%I"No histories"');
  PPx.Quit(1);
} else {
  !warn(`%Q"Delete all ${wh_value}-history?"`) || PPx.Quit(1);
}

let loop = 'true';
while (loop !== '') {
  loop = PPx.Extract(`%h${whistory}0`);
  PPx.Execute(`*deletehistory ${whistory},0`);
}

PPx.SetPopLineMessage(`All ${wh_value}-history deleted`);
