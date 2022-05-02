import type { Page, Response } from "@playwright/test"
import { project } from "../../fixtures/project"
const keyEditorSelectors = require("./KeyEditorSelectors")


export class KeyEditor {
 
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  fillKeyId(keyId: string): Promise<void> {
    return this.page
            .fill('#keyName', keyId)
}
  
  clickAddKeyBtn(): Promise<void> {
      return this.page
              .click(keyEditorSelectors.buttons.addKey)
  }

  clickAddFirstKey(): Promise<void> {
      return this.page
              .click(keyEditorSelectors.buttons.addFirstKey)
  }

  toggleSwitch(nth: number): Promise<void> {
    return this.page.click(keyEditorSelectors.switches.default + keyEditorSelectors.getNth(nth))
  }

  confirmPlatformSelect(): Promise<void> {
    return this.page
             .press(keyEditorSelectors.input.platformSelect, 'Enter')  
  }
  
  selectPlatform(): Promise<void> {
      return this.page
              .fill(keyEditorSelectors.input.platformSelect, "Web")
  }

  
  async addKey(keyId: string): Promise<void> {
    await this.fillKeyId(keyId)
    await this.selectPlatform()
    await this.confirmPlatformSelect()
    await this.clickAddKeyBtn()
  return
}

  async addPluralKey(keyId: string): Promise<void> {
    await this.fillKeyId(keyId)
    await this.selectPlatform()
    await this.confirmPlatformSelect()
    await this.page.click(keyEditorSelectors.tab.advanced)
    await this.toggleSwitch(3)
    await this.clickAddKeyBtn()
  return
}

  async clickAndTypeKeyValue(rowNumber: number, keyValue: string): Promise<void> {
    let dataId = await this.clickOnTranslationRow(rowNumber)
    await this.page.type(keyEditorSelectors.cell.transcell + keyEditorSelectors.getDataId(dataId), keyValue)
    return
  }

  async clickOnTranslationRow(rowNumber: number): Promise<string> {
    let dataId = await this.page
        .getAttribute(`tr.row-trans.translation:nth-child(${rowNumber})`, 'data-id')
    await this.page.click(keyEditorSelectors.cell.transcell + keyEditorSelectors.getDataId(dataId))
    return dataId
  }

  async selectFirstTranslationByKey(rowNumber: number): Promise<void> {
    let dataId = await this.clickOnTranslationRow(rowNumber)
    await this.page
      .press(`#transcell-${dataId}`, "Alt+1")
      return
  }

  async addPluralTranslation(nth: number, translation: string, form: string){
    await this.page.click(`[data-lokalise-editor-plural="${form}"] >> nth=${nth}`)
    await this.page.type('[class="CodeMirror-line"]', translation)
    await this.page.click('[alt="save"]') 
    return
  }
}