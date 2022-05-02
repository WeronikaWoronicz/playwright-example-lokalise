import type { Page, Response } from "@playwright/test"
import { project } from "../../fixtures/project"

export class KeyEditor {
 
  private page: Page

/** selectors */


// private firstNameInput = "#firstName";
// private lastNameInput = "#lastName";
// private usernameInput = "#username";
// private passwordInput = "#password";
// private emailInput = "#emailAddress";
// private phoneInput = "#phoneNumber";
// private signUpButton = ".cl-sign-up-button";
  
/** properties */
//url = config.HOST + "/sign-up";

  constructor(page: Page) {
    this.page = page
  }

  addKeyID(keyId: string): Promise<void> {
    return this.page
            .fill('#keyName', 'keyID')
}
  
  clickAddKeyBtn(): Promise<void> {
      return this.page
              .click('#btn_addkey')
  }

  clickAddFirstKey(): Promise<void> {
      return this.page
              .click('[aria-label="Add first key"]')
  }

  clickSwitch(nth: number): Promise<void> {
    return this.page.click(`[class="bootstrap-switch-handle-off bootstrap-switch-default"] >> nth=${nth}`)
  }

  confirmPlatformSelect(): Promise<void> {
    return this.page
             .press('#s2id_autogen6', 'Enter')  
  }
  
  selectOnePlatform(): Promise<void> {
      return this.page
              .fill('#s2id_autogen6', "Web")
  }

  
  async addKey(keyID: string): Promise<void> {
    await this.addKeyID(keyID)
    await this.selectOnePlatform()
    await this.confirmPlatformSelect()
    await this.clickAddKeyBtn()
  return
}

  async addPlurarKey(KeyID: string): Promise<void> {
    await this.addKeyID(KeyID)
    await this.selectOnePlatform()
    await this.confirmPlatformSelect()
    await this.page.click("#advanced_tab")
    await this.clickSwitch(3)
    await this.clickAddKeyBtn()
  return
}

  async clickAndTypeKeyValue(rowNumber: number, keyValue: string): Promise<void> {
    let dataId = await this.clickOnTranslationRow(rowNumber)
    await this.page.type(`#transcell-${dataId}`, keyValue)
    return
  }

  async clickOnTranslationRow(rowNumber: number): Promise<string> {
    let dataId = await this.page
        .locator(`tr.row-trans.translation:nth-child(${rowNumber})`)
        .getAttribute("data-id")
    await this.page.click(`#transcell-${dataId}`)
    return dataId
  }

  async selectFirstTranslationByKey(rowNumber: number): Promise<void> {
    let dataId = await this.clickOnTranslationRow(rowNumber)
    await this.page
      .press(`#transcell-${dataId}`, "Alt+1")
      return
  }

  async addPlurarTranslations(nth: number, translation: string, form: string){
    await this.page.click(`[data-lokalise-editor-plural="${form}"] >> nth=${nth}`)
    await this.page.type('[class="CodeMirror-line"]', translation)
    await this.page.click('[alt="save"]') 
    return
  }
}