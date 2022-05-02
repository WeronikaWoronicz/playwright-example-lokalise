type KeyEditorSelectors = {
    buttons: { [id: string]: string; }
    switches: { [id: string]: string; }
    getNth: (n: number) => string
}

const keyEditorSelectors: KeyEditorSelectors = {
  buttons: {
    },
    switches: {
        default: '[class="bootstrap-switch-handle-off bootstrap-switch-default"]'
    },
    getNth: (nth: number) => ` >> nth=${nth}`,
}

module.exports = keyEditorSelectors