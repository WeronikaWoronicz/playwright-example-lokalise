import { ProjectData } from "./ProjectData";
import { TranslationData } from "./TranslationData";
import { faker } from "@faker-js/faker";
import { DataFactory } from "./DataFactory";

export class FakerDataFactory implements DataFactory {
    getProject(): ProjectData {
        return {
            name: faker.random.word(),
            language: faker.random.arrayElement(['Spanish (es)', 'French (fr)'])
        };
    }

    getTranslation(project: ProjectData): TranslationData {
        faker.setLocale(project.language.split(' ')[1].replace('[', '').replace(']', ''));
        return {
            platform: faker.random.arrayElement(['Web', 'Mobile', 'Desktop']),
            key: faker.random.word(),
            baseSingular: faker.random.word(),
            basePlural: faker.random.word(),
            translationSingular: faker.random.word(),
            translationPlural: faker.random.word()
        };
    }
}
