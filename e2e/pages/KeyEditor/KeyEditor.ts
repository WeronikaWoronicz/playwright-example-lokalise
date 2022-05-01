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

  addKeyID(): Promise<void> {
    return this.page
            .fill('#keyName', 'Login')
}
  
  clickAddKeyBtn(): Promise<void> {
      return this.page
              .click('#btn_addkey')
  }

  clickAddFirstKey(): Promise<void> {
      return this.page
              .click('[aria-label="Add first key"]')
  }

  confirmPlatformSelect(): Promise<void> {
    return this.page
             .press('#s2id_autogen6', 'Enter')  
  }
  
  selectOnePlatform(): Promise<void> {
      return this.page
              .fill('#s2id_autogen6', "Web")
  }

  
  async addKey() {
    await this.addKeyID()
    await this.selectOnePlatform()
    await this.confirmPlatformSelect()
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

}