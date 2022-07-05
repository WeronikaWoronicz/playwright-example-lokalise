import { LokaliseApi } from "@lokalise/node-api"

export interface ApiHelper {
    createProject: (projectName: string) => Promise<any>
    removeAllProjects: () => void 
}

export class LokaliseApiHelper implements ApiHelper {
	lokaliseApi: LokaliseApi

	constructor(apiKey: any) {
		this.lokaliseApi = new LokaliseApi({ apiKey: apiKey })
	}

	async createProject(projectName: string) {
		return await this.lokaliseApi.projects().create(
			{
				name: projectName,
				description: "Here's my Node.js project",
				languages: [
					{
						"lang_iso": "en"
					},
					{
						"lang_iso": "fr"
					}
				],
				"base_lang_iso": "en"
			})
	}

	async removeAllProjects() 
	{
		const projects = await this.lokaliseApi.projects().list()
		const projectsIds = projects.items.map(p => p.project_id)
		for (const id of projectsIds) {
			await this.lokaliseApi.projects().delete(id)
		}
	}
}