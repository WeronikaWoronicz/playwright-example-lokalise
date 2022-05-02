type KeyEditorSelectors = {
    buttons: { [id: string]: string; }
    input: { [id: string]: string; }
    switches: { [id: string]: string; }
    tab: { [id: string]: string; }
    cell: { [id: string]: string; }
    getNth: (n: number) => string
    getDataId: (dataId: number) => string
}

const keyEditorSelectors: KeyEditorSelectors = {
    buttons: {
      addKey: '#btn_addkey',
      addFirstKey: '[aria-label="Add first key"]',
    },
    input: {
         keyId: '#keyName',
         platformSelect: '#s2id_autogen6',
    },
    switches: {
        default: '[class="bootstrap-switch-handle-off bootstrap-switch-default"]'
    },
    tab: {
        advanced: '#advanced_tab',
    },
    cell: {
           trans:'#transcell-'},
    getDataId: (dataId: number) => `${dataId}`,

    getNth: (nth: number) => ` >> nth=${nth}`,

}

module.exports = keyEditorSelectors