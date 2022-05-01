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
    await keyEditor.addKey()
  })

  test("translation for plain key should be added", async ({ page }) => {
    const keyEditor = new KeyEditor(page)

    await keyEditor.clickAddFirstKey()
    await keyEditor.addKey()
    await page.isVisible(`a:text("${project.name}")`)
    await keyEditor.clickAndTypeKeyValue(1, 'Login')
    await keyEditor.selectFirstTranslationByKey(2)
  })

  test("translation for plural key should be added", async ({ page }) => {
    await page.locator('[aria-label="Add first key"]').click()
    await page.locator("#keyName").fill("The End")
    await page.locator("#s2id_autogen6").fill("Web")
    await page.locator("#s2id_autogen6").press("Enter")
    await page.locator("#advanced_tab").click()
    await page
      .locator(
        '[class="bootstrap-switch-handle-off bootstrap-switch-default"] >> nth=3'
      )
      .click()
    await page.click("#btn_addkey")
    await page.click('[data-lokalise-editor-plural="one"] >> nth=0')
    await page.type('[class="CodeMirror-line"]', 'cat')
    await page.click('[alt="save"]')
    await page.click('[data-lokalise-editor-plural="other"] >> nth=0')
    await page.type('[class="CodeMirror-line"]', 'cats')
    await page.click('[alt="save"]')
    await page.click('[data-lokalise-editor-plural="one"] >> nth=1')
    await page.type('[class="CodeMirror-line"]', 'el gato')
    await page.click('[alt="save"]')
    await page.click('[data-lokalise-editor-plural="other"] >> nth=1')
    await page.type('[class="CodeMirror-line"]', 'los gatos')
    await page.click('[alt="save"]')  
  })
})