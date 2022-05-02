import { test, expect} from "@playwright/test"
import { project } from "../fixtures/project"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/Project/CreateProject"
import { KeyEditor } from "../pages/KeyEditor/KeyEditor"


test.beforeEach(async ({ page }) => {
  const projects = new Projects(page)
  const createProject = new CreateProjects(page)

  await projects.navigate()
  await projects.removeAllProjects()
  await createProject.clickCreateFirstProjectBtn()
  await createProject.createProjectWithJustRequiredFields()
})

test.afterAll(async ({ page }) => {
  const projects = new Projects(page)
  
  await projects.navigate()
  await projects.removeAllProjects()
})

test.describe("Add key", () => {
  test("first key should be added in key editor", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    await keyEditor.clickAddFirstKey()
    await keyEditor.addKey('KeyID')
    await page.waitForSelector('a:text("KeyID")')
    const keyIdVisibility = await page.locator('a:text("KeyID")').isVisible()
    expect(keyIdVisibility).toBe(true)

  })

  test("translation for plain key should be added", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    await keyEditor.clickAddFirstKey()
    await keyEditor.addKey('KeyID')
    await page.isVisible(`a:text("${project.name}")`)
    await keyEditor.clickAndTypeKeyValue(1, 'Login')
    await keyEditor.selectFirstTranslationByKey(2)
    await keyEditor.checkThatTranslationValueIsNotNull(2)
    console.log('Translation is added')
   
  })

  test("translation for plural key should be added", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    await keyEditor.clickAddFirstKey()
    await keyEditor.addPluralKey('KeyId')
    await keyEditor.addPluralTranslation(0, 'cat', 'one')
    await keyEditor.addPluralTranslation(0, 'cats', 'other')
    await keyEditor.addPluralTranslation(1, 'el gato', 'one')
    await keyEditor.addPluralTranslation(1, 'los gatos', 'other')
    await keyEditor.checkThatPluralTranslationIsAdded(1, 'el gato', 'los gatos','one', 'other' )
    console.log('Plural translation is added')
  })
})