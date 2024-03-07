/* @file Create a new file with a template */

import {useLanguage, tmp} from '@ppmdev/modules/data.ts';
import fso, {copyFile} from '@ppmdev/modules/filesystem.ts';
import {ppm} from '@ppmdev/modules/ppm.ts';
import {expandSource} from '@ppmdev/modules/source.ts';
import {langCreateNewFile} from './mod/language.ts';
import debug from '@ppmdev/modules/debug.ts';

const lang = langCreateNewFile[useLanguage()];

const main = (): void => {
  const pwd = PPx.Extract('%1');

  if (!fso.FolderExists(pwd)) {
    ppm.linemessage('C', lang.notExist, true);

    return;
  }

  const compPath = tmp().file;
  const sourceDir = expandSource('ppm-edit')?.path;
  const templateDir = PPx.Extract("%sgu'ppmcache'\\template\\filetype");

  if (!sourceDir) {
    ppm.echo('ppm-edit', `Warning: ${lang.sourceNotFound}`);

    return;
  }

  PPx.Execute(`%Obdq ${sourceDir}\\bin\\make_templatelist.exe "${compPath}" "${templateDir}"%&`);
  ppm.setkey('^O', `*edit -utf8 -crlf "%%se'filename'"%%:*completelist -file:"%%se'filename'"`);
  ppm.setkey('^S', `%(*completelist -close%:%k"a"%:%K"@^']'"%)`);

  const [errorlevel, data] = ppm.getinput({
    title: lang.liedtitle,
    mode: 'e',
    autoselect: true,
    k: `*string e,filename=${compPath}%%:*completelist -detail:"user1" -file:"${compPath}"`
  });

  if (errorlevel !== 0) {
    return;
  }

  const item = createItem(data);

  if (!item) {
    ppm.echo('ppm-edit', `Error: ${lang.wrongFormat}`);

    return;
  }

  debug.log(JSON.stringify(item));

  !item.template
    ? PPx.Execute(`*makefile ${pwd}\\${item.name}`)
    : copyFile(`${templateDir}\\${item.template}`, `${pwd}\\${item.name}`);

  PPx.Execute(`*execute ,%*getcust(S_ppm#user:editor) ${item.ln} "${pwd}\\${item.name}"`);
};

const createItem = (data: string) => {
  const ref = data.split(' ');
  let [ext, ln]: string[] = ['', ''];

  if (ref.length === 1) {
    return {name: ref[0], ln};
  }

  if (ref[1]?.indexOf('_') !== 0) {
    return undefined;
  }

  if (!~ref[2]?.indexOf('ext=')) {
    return undefined;
  } else {
    ext = ref[2].slice(4);
  }

  if (!~ref[3]?.indexOf('line=')) {
    return undefined;
  } else {
    ln = `%*getcust(S_ppm#user:editline)${ref[3].slice(5)}`;
  }

  return {name: `${ref[0]}.${ext}`, template: `${ref[1]}.${ext}`, ln};
};

main();
