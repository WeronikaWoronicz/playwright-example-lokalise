import { test, expect} from "@playwright/test"
import { project } from "../fixtures/project"
import { Projects } from "../pages/Projects/Projects"
import { KeyEditor } from "../pages/KeyEditor/KeyEditor"
import { LokaliseApiHelper, ApiHelper } from "../lib/LokaliseApiHelper"  
const createProjectSelectors = require("../pages/CreateProject/CreateProjectSelectors")
const keyEditorSelectors = require("../pages/KeyEditor/KeyEditorSelectors")



test.beforeEach(async ({ page }) => {
const projects = new Projects(page)
  // const createProjectPage = new CreateProjects(page)

  const apiHelper: ApiHelper = new LokaliseApiHelper(process.env.API_KEY)

  await apiHelper.removeAllProjects()
  const newProject = await apiHelper.createProject(project.name)
  await projects.navigate(`/project/${newProject.project_id}/`)
})

test.afterAll(async ({ page }) => {
  const projects = new Projects(page)
  const apiHelper: ApiHelper = new LokaliseApiHelper(process.env.API_KEY)
  
  await apiHelper.removeAllProjects()
})

test.describe("Add key", () => {
  test("first key should be added in key editor", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    // act (steps)
    await keyEditor.clickAddFirstKey()
    await keyEditor.addKey(project.keyId)

    // assert (expected results)
    await keyEditor.expectThatKeyIsAdded()
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