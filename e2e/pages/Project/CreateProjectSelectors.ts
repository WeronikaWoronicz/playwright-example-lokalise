type CreateProjectSelectors = {
    buttons: { [id: string]: string; }
    getNth: (n: number) => string
}

const createProjectSelectors: CreateProjectSelectors = {
  buttons: {
        getStarted: 'button:text("Get started")',
    },
    getNth: (nth: number) => ` >> nth=${nth}`,
}

module.exports = createProjectSelectors