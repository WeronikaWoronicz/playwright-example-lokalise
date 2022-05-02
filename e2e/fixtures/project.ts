import { faker } from "@faker-js/faker" 

type Project = {
    name: string;
    otherName: string
    platform: string
    language: string
    keyId: string
    toTranslate: string
    pluralToTranslateOne: string,
    pluralToTranslateOther: string,
    pluralTranslationOne: string,
    pluralTranslationOther: string,
  }
  
export const project: Project = {
      name: 'Test project ' + faker.random.word(),
      otherName: 'Test project ' + faker.random.word(),
      platform: 'Web',
      language: 'Spanish (es)',
      keyId: 'KeyID',
      toTranslate: 'Login',
      pluralToTranslateOne: 'cat',
      pluralToTranslateOther: 'cats',
      pluralTranslationOne: 'el gato',
      pluralTranslationOther: 'los gatos',
    }
