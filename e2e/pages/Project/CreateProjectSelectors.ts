type CreateProjectSelectors = {
    buttons: { [id: string]: string; }
    input: { [id: string]: string; }
    getNth: (n: number) => string
}

const createProjectSelectors: CreateProjectSelectors = {
  buttons: {
        getStarted: 'button:text("Get started")',
        proceed: 'button:text("Proceed")',
        newProject: 'button:text("New project")',
    },
    getNth: (nth: number) => ` >> nth=${nth}`,
}

module.exports = createProjectSelectors