import { ProjectData } from "./ProjectData"
import { TranslationData } from "./TranslationData"
import { JsonDataFactory } from "./JsonDataFactory";
import { FakerDataFactory } from "./FakerDataFactory";

export interface DataFactory {
    getProject: () => ProjectData
    getTranslation: (project: ProjectData) => TranslationData
}

const testDatapath = process.env.TEST_DATA_PATH
export const DataFactory: DataFactory = testDatapath === undefined ?
    new FakerDataFactory()
    : new JsonDataFactory(testDatapath)
