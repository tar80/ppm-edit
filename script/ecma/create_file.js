//!*script
/**
 * Create a new file using a template
 *
 */

'use strict';

/* Import modules */
const st = PPx.CreateObject('ADODB.stream');
let module = function (filepath) {
  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(filepath);
  const data = st.ReadText(-1);
  st.Close;

  return Function(' return ' + data)();
};

// Load modules
const util = module(PPx.Extract('%*getcust(S_ppm#global:module)\\util.js'));
const input = module(PPx.Extract('%*getcust(S_ppm#global:module)\\input.js'));
module = null;

const comp_path = PPx.Extract('%*temp()%\\ppm_editcomptemp.txt');
const template_dir = PPx.Extract('%*getcust(S_ppm#global:cache)\\template\\filetype');

PPx.Execute(`%Obdq %*getcust(S_ppm#plugins:ppm-edit)\\bin\\make_templatelist.exe "${comp_path}" "${template_dir}"%&`)

input.addkey("^'@'", '*jumppath %*getcust(S_ppm#global:cache)\\template\\filetype', 'Open template dir');

const get_format = input.lied.call({
  title: 'Create file',
  mode: 'e',
  select: 'l',
  listname: comp_path,
  k: '*completelist -detail:"user1"'
});

const pwd = PPx.Extract('%D').replace(/^aux:S_gm-file\\/, '');
const name_format = get_format.split(' ');
let file_name;

if (name_format.length !== 4) {
  file_name = `${pwd}\\${name_format[0]}`;
  util.execute('C', `*makefile ${file_name}%%:%*getcust(S_ppm#user:editor) ${file_name}`);
  PPx.Quit(1);
}

const edit_spec = (prop = name_format) => {
  if (prop[1].indexOf('_') !== 0 || !~prop[2].indexOf('ext=') || !~prop[3].indexOf('line=')) {
    util.quitMsg('wrong format');
  }

  const ext = `${prop[2].slice(4)}`;

  return {
    newfile: `${pwd}\\${prop[0]}.${ext}`,
    template: `${template_dir}\\${prop[1]}.${ext}`,
    ln: prop[3].slice(5)
  };
};
const edit = edit_spec();

const fso = PPx.CreateObject('Scripting.FileSystemObject');
fso.CopyFile(edit.template, edit.newfile);

util.execute(
  'C',
  `%*getcust(S_ppm#user:editor) %*getcust(S_ppm#user:editline)${edit.ln} ${edit.newfile}`
);
