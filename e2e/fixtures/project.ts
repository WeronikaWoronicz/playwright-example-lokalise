import { faker } from "@faker-js/faker" 

type Project = {
    name: string;
    otherName: string
    platform: string
  }
  
export const project: Project = {
      name: 'Test project ' + faker.random.word(),
      otherName: 'Test project ' + faker.random.word(),
      platform: 'Web',
    }
