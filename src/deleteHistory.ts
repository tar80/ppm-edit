/* @file Delete all currently referenced history */

import {pathSelf} from '@ppmdev/modules/path.ts';
import {useLanguage} from '@ppmdev/modules/data.ts';
import {type Histories, refHistory} from '@ppmdev/modules/meta.ts';
import {langDeleteHistory} from './mod/language.ts';

const historyName = PPx.Extract('%*editprop(whistory)').toLowerCase() as Histories;
const historyLetter = refHistory[historyName];
const lang = langDeleteHistory[useLanguage()];

if (!historyLetter) {
  PPx.linemessage(lang.noReferenced);
  PPx.Quit(1);
}

PPx.Execute(`%"${pathSelf().scriptName}"%Q"${lang.question(historyLetter)}"`) !== 0 && PPx.Quit(1);

while (true) {
  if (PPx.Extract(`%h${historyName}0`) === '') {
    break;
  }

  PPx.Execute(`*deletehistory ${historyName},0`);
}

PPx.linemessage(lang.completed(historyLetter));
