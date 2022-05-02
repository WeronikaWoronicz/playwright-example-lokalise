type KeyEditorSelectors = {
    buttons: { [id: string]: string; }
    form: { [id: string]: string; }
    input: { [id: string]: string; }
    save: { [id: string]: string; }
    keyShortcuts: { [id: string]: string; }
    switches: { [id: string]: string; }
    tab: { [id: string]: string; }

    getNth: (n: number) => string
    getDataId: (dataId: number) => string
    getPluralForm: (form: string) => string
    getRowNumber: (rowNumber: number) => string
}

const keyEditorSelectors: KeyEditorSelectors = {
    buttons: {
      addKey: '#btn_addkey',
      addFirstKey: '[aria-label="Add first key"]',
    },
    input: {
         keyID: '#keyName',
         platformSelect: '#s2id_autogen6',
    },
    keyShortcuts: {
        firstTranslation: "Alt+1",
        enter: "Enter",
    },
    switches: {
        default: '[class="bootstrap-switch-handle-off bootstrap-switch-default"]'
    },
    save: {
        alt: '[alt="save"]'
    },
    tab: {
        advanced: '#advanced_tab',
    },
    form: {
           transcell: '#transcell-',
           trRow: 'tr.row-trans.translation',
           line: '[class="CodeMirror-line"]'
        },    
    getDataId: (dataId: number) => `${dataId}`,
    getNth: (nth: number) => ` >> nth=${nth}`,
    getPluralForm: (form: string) => `[data-lokalise-editor-plural="${form}"]`,
    getRowNumber: (rowNumber: number) => `:nth-child(${rowNumber})`,    
}

module.exports = keyEditorSelectors