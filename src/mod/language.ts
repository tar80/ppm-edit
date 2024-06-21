export const langDeleteHistory = {
  en: {
    noReferenced: 'History not referenced.',
    question: (word: string) => `Do you want to delete all history of ${word}?`,
    completed: (word: string) => `Deleted all history of the ${word}.`
  },
  ja: {
    noReferenced: '参照履歴が設定されていません',
    question: (word: string) => `${word} の全履歴を削除しますか？`,
    completed: (word: string) => `${word} の全履歴を削除しました`
  }
};

export const langCreateNewFile = {
  en: {
    notExist: 'Parent directory does not exist',
    sourceNotFound: 'S_ppm#source:ppm-edit not found',
    wrongFormat: 'wrong format',
    liedtitle: 'Create new file'
  },
  ja: {
    notExist: 'このディレクトリには作成できません',
    sourceNotFound: 'S_ppm#source:ppm-edit がありません',
    wrongFormat: 'フォーマットが間違っています',
    liedtitle: '新規ファイル作成'
  }
};
