/* @file Expands and inserts the selected text as a macro
 * @arg 0 {number} - If "1" is specified, display without inserting
 */

import {hasArg} from '@ppmdev/modules/argument.ts';
import {isEmptyStr} from '@ppmdev/modules/guard.ts';
import debug from '@ppmdev/modules/debug.ts';

const main = () => {
  const isPrint = hasArg('1');
  const text = PPx.Extract('%*selecttext');
  let result = '';

  if (text.indexOf('%') === 0) {
    result = PPx.Extract(text);
  } else if (text.indexOf('u') === 0) {
    result = PPx.Extract(`%b${text.substring(1)}`);
  } else if (text.indexOf('x') === 0) {
    result = PPx.Extract(`%b${text}`);
  }

  if (isEmptyStr(result)) {
    return;
  }

  isPrint ? PPx.linemessage(result) : PPx.Execute(`*insert ${result}`);
};

main();
