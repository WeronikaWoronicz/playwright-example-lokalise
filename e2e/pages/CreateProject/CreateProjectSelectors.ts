type CreateProjectSelectors = {
    buttons: { [id: string]: string; }
    container: { [id: string]: string; }
    input: { [id: string]: string; }
    key: { [id: string]: string; }
    getNth: (n: number) => string
    getProjectLink: (projectName: string) => string
}

const createProjectSelectors: CreateProjectSelectors = {
    buttons: {
        getStarted: 'button:text("Get started")',
        proceed: 'button:has-text("Proceed")',
        newProject: 'button:has-text("New project")',
    },
    input: {
        targetLanguage: '#react-select-3-input',
        projectName: '[placeholder="MyApp \\(iOS \\+ Android \\+ Web\\)"]',
    },
    key: {
        enter: "Enter",
    },
    container: {
        project: '[data-name="project-container"]',
    },
    getNth: (nth: number) => ` >> nth=${nth}`,
    getProjectLink: (projectName: string) => `a:text("${projectName}")`,

}

module.exports = createProjectSelectors