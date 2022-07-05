import { test, expect } from "@playwright/test"
import { Projects } from "../pages/Projects/Projects"
import { KeyEditor } from "../pages/KeyEditor/KeyEditor"
import { DataFactory } from "../fixtures/DataFactory"
import { LokaliseApiHelper, ApiHelper } from "../lib/LokaliseApiHelper"
const createProjectSelectors = require("../pages/CreateProject/CreateProjectSelectors")

let projects: Projects
let keyEditor: KeyEditor
const apiHelper: ApiHelper = new LokaliseApiHelper(process.env.API_KEY)
let projectData = DataFactory.getProject()

test.beforeEach(async ({ page }) => {
	projects = new Projects(page)
	keyEditor = new KeyEditor(page)

	await apiHelper.removeAllProjects()
	const newProject = await apiHelper.createProject(projectData.name)
	await projects.navigate(`/project/${newProject.project_id}/`)
})

test.afterAll(async ({ page }) => {
	await apiHelper.removeAllProjects()
})

test.describe("Add key", () => {
	test("first key should be added in key editor", async ({ page }) => {
		const translationData = DataFactory.getTranslation(projectData)

		// act (steps)
		await keyEditor.clickAddFirstKeyBtn()
		await keyEditor.addKey(translationData.key, translationData.platform)

		// assert (expected results)
		await keyEditor.expectThatKeyIsAdded(translationData.key)
		console.log("Key is added")

	})

	test("translation for plain key should be added", async ({ page }) => {
		const translationData = DataFactory.getTranslation(projectData)

		// arrange (preconditions)
		await keyEditor.clickAddFirstKeyBtn()
		await keyEditor.addKey(translationData.key, translationData.platform)
		await page.isVisible(createProjectSelectors.getProjectLink(projectData.name))

		// act (steps)
		await keyEditor.clickAndTypeKeyValue(1, translationData.key)
		await keyEditor.selectFirstTranslationByKey(2)

		// assert (expected results)
		await keyEditor.expectThatTranslationValueIsNotNull(2)
		console.log('Translation is added')

	})

	test("translation for plural key should be added", async ({ page }) => {
		const translationData = DataFactory.getTranslation(projectData)

		// arrange (preconditions)
		await keyEditor.clickAddFirstKeyBtn()
		await keyEditor.addPluralKey(translationData.key, translationData.platform)

		// act (steps)
		await keyEditor.addPluralTranslation(translationData)

		// assert (expected results)
		await keyEditor.expectPluralTranslationToExist(translationData)
		console.log('Plural translation is added')
	})
})