import { test, expect} from "@playwright/test"
import { project } from "../fixtures/project"
import { Projects } from "../pages/Projects/Projects"
import { CreateProjects } from "../pages/Project/CreateProject"
import { KeyEditor } from "../pages/KeyEditor/KeyEditor"
const createProjectSelectors = require("../pages/Project/CreateProjectSelectors")
const keyEditorSelectors = require("../pages/KeyEditor/KeyEditorSelectors")



test.beforeEach(async ({ page }) => {
  const projects = new Projects(page)
  const createProject = new CreateProjects(page)

  await projects.navigate()
  await projects.removeAllProjects()
  await createProject.clickCreateFirstProjectBtn()
  await createProject.createProjectWithJustRequiredFields(project.name)
})

test.afterAll(async ({ page }) => {
  const projects = new Projects(page)
  
  await projects.navigate()
  await projects.removeAllProjects()
})

test.describe("Add key", () => {
  test("first key should be added in key editor", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    // act (steps)
    await keyEditor.clickAddFirstKey()
    await keyEditor.addKey(project.keyId)

    // assert (expected results)
    await page.waitForSelector(keyEditorSelectors.getKeyIdLink(project.keyId))
    const keyIdVisibility = await page.locator(keyEditorSelectors.getKeyIdLink(project.keyId)).isVisible()
    expect(keyIdVisibility).toBe(true)
    console.log("Key is added")

  })

  test("translation for plain key should be added", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    // arrange (preconditions)
    await keyEditor.clickAddFirstKey()
    await keyEditor.addKey(project.keyId)
    await page.isVisible(createProjectSelectors.getProjectLink(project.name))

    // act (steps)
    await keyEditor.clickAndTypeKeyValue(1, project.toTranslate)
    await keyEditor.selectFirstTranslationByKey(2)

    // assert (expected results)
    await keyEditor.expectThatTranslationValueIsNotNull(2)
    console.log('Translation is added')
   
  })

  test("translation for plural key should be added", async ({ page }) => {
    const keyEditor = new KeyEditor(page)
    
    // arrange (preconditions)
    await keyEditor.clickAddFirstKey()
    await keyEditor.addPluralKey(project.keyId)

    // act (steps)
    await keyEditor.addPluralTranslation(0, project.pluralToTranslateOne, keyEditorSelectors.pluralForm.one)
    await keyEditor.addPluralTranslation(0, project.pluralToTranslateOther, keyEditorSelectors.pluralForm.other)
    await keyEditor.addPluralTranslation(1, project.pluralTranslationOne, keyEditorSelectors.pluralForm.one)
    await keyEditor.addPluralTranslation(1, project.pluralTranslationOther, keyEditorSelectors.pluralForm.other)

    // assert (expected results)
    await keyEditor.expectThatPluralTranslationIsAdded(1, project.pluralTranslationOne, project.pluralTranslationOther,keyEditorSelectors.pluralForm.one, keyEditorSelectors.pluralForm.other )
    console.log('Plural translation is added')
  })
})