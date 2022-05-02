type ProjectsSelectors = {
    button: { [id: string]: string; }
    input: { [id: string]: string; }
    link:  { [id: string]: string; }
    menuitem:  { [id: string]: string; }
    project: { [id: string]: string; }
}


const projectsSelectors: ProjectsSelectors = {
    button: {
        more: '[aria-label="More\\.\\.\\."] >> nth=0',  
        deleteProject: 'button:has-text("Delete project")'
    },
    input: {
        projectName: '.bootbox-input'
    },
    link: {
        projects: 'a:text("Projects")',
        delete: 'text=Delete project'
    },
    menuitem: {
        settings:'[role=menuitem][aria-label="Settings"]'
    },
    project: {name:'[placeholder="Project name"]'
 },
}

module.exports = projectsSelectors