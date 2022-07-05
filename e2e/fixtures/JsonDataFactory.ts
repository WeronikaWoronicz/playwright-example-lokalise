import { ProjectData } from "./ProjectData"
import { TranslationData } from "./TranslationData"
import { DataFactory } from "./DataFactory"
import fs from "fs"

export class JsonDataFactory implements DataFactory {
	projects: ProjectData[]
	translations: TranslationData[]
	constructor(testDataPath: string) {
		let testData = JSON.parse(fs.readFileSync(testDataPath, "utf8"))
		this.projects = testData.projects
		this.translations = testData.translations
	}
	getProject(): ProjectData {
		return this.projects[Math.floor(Math.random() * this.projects.length)]
	}

	getTranslation(project: ProjectData): TranslationData {
		return this.translations[Math.floor(Math.random() * this.translations.length)]
	}
}
