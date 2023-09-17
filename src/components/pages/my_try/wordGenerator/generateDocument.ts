import { Document, LevelFormat, AlignmentType, ISectionOptions } from 'docx'
import GenerateOfGeneral from './generateOfGeneral'
import { IData } from './document'
import { getIntroBySchedule1 } from './sections/schedule1Intro'
import { getSectionBySchedule1 } from './sections/schedule1Section'
import { getSectionBySchedule2 } from './sections/schedule2Section'
import { getSectionBySchedule3 } from './sections/schedule3Section'

class generateDocument extends GenerateOfGeneral {
    data: IData
    constructor(data: IData) {
        super()
        this.data = data
    }

    private createPage(content: object[]): ISectionOptions {
        return {
            ...super.getGeneral(this.data),
            // @ts-ignore
            children: content
        }
    }

    async createDocument () {
        return new Document({
            numbering: {
                config: [
                    {
                        reference: "section-title",
                        levels: [
                            {
                                level: 0,
                                format: LevelFormat.DECIMAL,
                                text: "",
                                alignment: AlignmentType.LEFT,
                                style: {
                                    paragraph: {
                                        indent: { left: 0, hanging: 200 },

                                    }
                                },
                            },
                        ],
                    },
                    {
                        reference: "section-sub-title",
                        levels: [
                            {
                                level: 1,
                                format: LevelFormat.DECIMAL,
                                text: "",
                                alignment: AlignmentType.LEFT,
                                style: {
                                    paragraph: {
                                        indent: { left: 300, hanging: 200 },

                                    },
                                },
                            },
                        ],
                    },
                    {
                        reference: "section-letter-list",
                        levels: [
                            {
                                level: 2,
                                format: LevelFormat.LOWER_LETTER,
                                text: "",
                                alignment: AlignmentType.LEFT,
                                style: {
                                    paragraph: {
                                        indent: { left: 600, hanging: 0 },
                                    }
                                }
                            },
                        ],
                    },
                ],
            },
            sections: [
                this.createPage(getIntroBySchedule1()),
                ...this.data?.currentAsicExtracts?.map((sectionData, i) => this.createPage(getSectionBySchedule1(sectionData, this.data, i))),
                this.createPage(await getSectionBySchedule2(this.data?.proprietorSearches, this.data)),
                this.createPage(getSectionBySchedule3(this.data?.ppsrSearchGroups, this.data))
            ],
        })
    }
}

export default generateDocument
