import type { Page, Response} from "@playwright/test"
import { expect } from "@playwright/test"
import { TranslationData } from "../../fixtures/TranslationData"
import { KeyEditorToggles } from "./KeyEditorToggles"
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

  clickAddFirstKeyBtn(): Promise<void> {
      return this.page
              .click(keyEditorSelectors.buttons.addFirstKey)
  }

  flipToggle(toggle: KeyEditorToggles): Promise<void> {
    return this.page.click(keyEditorSelectors.switches.default + keyEditorSelectors.getNth(toggle))
  }

  confirmPlatformSelect(): Promise<void> {
    return this.page
             .press(keyEditorSelectors.input.platformSelect, keyEditorSelectors.keyShortcuts.enter)  
  }
  
  selectPlatform(platform: string): Promise<void> {
      return this.page
              .fill(keyEditorSelectors.input.platformSelect, platform)
  }

  
  async addKey(keyId: string, platform: string): Promise<void> {
    await this.fillKeyId(keyId)
    await this.selectPlatform(platform)
    await this.confirmPlatformSelect()
    await this.clickAddKeyBtn()
  return
}

  async addPluralKey(keyId: string, platform: string): Promise<void> {
    await this.fillKeyId(keyId)
    await this.selectPlatform(platform)
    await this.confirmPlatformSelect()
    await this.page.click(keyEditorSelectors.tab.advanced)
    await this.flipToggle(KeyEditorToggles.IsPlural)
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

  async fillTranslationKeyPart(tableRowNumber: number, translation: string, form: string){
    await this.page.click(keyEditorSelectors.getPluralForm(form) + keyEditorSelectors.getNth(tableRowNumber))
    await this.page.type(keyEditorSelectors.form.line, translation)
    await this.page.click(keyEditorSelectors.save.alt) 
    return
  }

  async fillTranslationKeyBaseLanguage(translation: TranslationData): Promise<void> {
    await this.fillTranslationKeyPart(0, translation.baseSingular, keyEditorSelectors.pluralForm.one)
    await this.fillTranslationKeyPart(0, translation.basePlural, keyEditorSelectors.pluralForm.other)
  }
  async fillTranslatioKeyTranslationLanguage(translation: TranslationData): Promise<void> {
    await this.fillTranslationKeyPart(1, translation.translationSingular, keyEditorSelectors.pluralForm.one)
    await this.fillTranslationKeyPart(1, translation.translationPlural, keyEditorSelectors.pluralForm.other)
  }

  async addPluralTranslation(translation: TranslationData){
    await this.fillTranslationKeyBaseLanguage(translation)
    await this.fillTranslatioKeyTranslationLanguage(translation)
  }

// Assertions

  async expectThatKeyIsAdded(key: string) : Promise<void> { 
    await this.page.waitForSelector(keyEditorSelectors.getKeyIdLink(key))
    const keyIdVisibility = await this.page.locator(keyEditorSelectors.getKeyIdLink(key)).isVisible()
    expect(keyIdVisibility).toBe(true)
   }


  async expectThatTranslationValueIsNotNull(rowNumber: number): Promise<void> {
    let dataId = await this.clickOnTranslationRow(rowNumber)
    let translationLocator = this.page.locator(keyEditorSelectors.form.transcell + keyEditorSelectors.getDataId(dataId))
    expect(translationLocator).not.toBeEmpty()
    return
  }

  async expectPluralTranslationToExist(translation: TranslationData) : Promise<void> {
    let pluralTranslationLocatorOne = this.page.locator(keyEditorSelectors.getPluralForm(keyEditorSelectors.pluralForm.one) + keyEditorSelectors.getNth(1))
    let pluralTranslationLocatorOther = this.page.locator(keyEditorSelectors.getPluralForm(keyEditorSelectors.pluralForm.other) + keyEditorSelectors.getNth(1))
    expect(pluralTranslationLocatorOne).toHaveText(translation.translationSingular)
    expect(pluralTranslationLocatorOther).toHaveText(translation.translationPlural)
    return
  }
}