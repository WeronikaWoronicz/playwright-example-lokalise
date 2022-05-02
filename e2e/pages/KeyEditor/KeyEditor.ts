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
            .fill(keyEditorSelectors.input.keyID, keyId)
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
             .press(keyEditorSelectors.input.platformSelect, keyEditorSelectors.keyShortcuts.enter)  
  }
  
  selectPlatform(): Promise<void> {
      return this.page
              .fill(keyEditorSelectors.input.platformSelect, project.platform)
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
    await this.page.type(keyEditorSelectors.form.transcell + keyEditorSelectors.getDataId(dataId), keyValue)
    return
  }

  async clickOnTranslationRow(rowNumber: number): Promise<string> {
    let dataId = await this.page
        .getAttribute(keyEditorSelectors.form.trRow + keyEditorSelectors.getRowNumber(rowNumber), 'data-id')
    await this.page.click(keyEditorSelectors.form.transcell + keyEditorSelectors.getDataId(dataId))
    return dataId
  }

  async selectFirstTranslationByKey(rowNumber: number): Promise<void> {
    let dataId = await this.clickOnTranslationRow(rowNumber)
    await this.page
      .press(keyEditorSelectors.form.transcell + keyEditorSelectors.getDataId(dataId), keyEditorSelectors.keyShortcuts.firstTranslation)
      return
  }

  async addPluralTranslation(nth: number, translation: string, form: string){
    await this.page.click(keyEditorSelectors.getPluralForm(form) + keyEditorSelectors.getNth(nth))
    await this.page.type(keyEditorSelectors.form.line, translation)
    await this.page.click(keyEditorSelectors.save.alt) 
    return
  }
}