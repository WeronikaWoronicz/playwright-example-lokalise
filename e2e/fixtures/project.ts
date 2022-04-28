import { faker } from "@faker-js/faker" 

type Project = {
    name: string;
  }
  
export const project: Project = {
      name: 'Test project ' + faker.random.word(),
    }
