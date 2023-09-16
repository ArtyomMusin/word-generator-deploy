import { HeadingLevel, Paragraph, TextRun, AlignmentType } from 'docx'
import { config } from '../config'
import GenerateOfGeneral from '../generateOfGeneral'
import { checkSingle } from '../utils'

class GenerateSchedule1Intro extends GenerateOfGeneral {
    constructor() {
        super()
    }
    generate() {
        const date = new Date()

        const getTime = () => {
            const hours = date.getHours() < 13 ? date.getHours() : date.getHours() - 12
            const minutes = date.getMinutes()
            const afternoon = hours > 12 ? 'pm' : 'am'
            return `${checkSingle(hours)}:${checkSingle(minutes)} ${afternoon}`
        }

        return [
            super.createSchedule('Schedule 1: Company Information'),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Target Group information extracted from the",
                        italics: true,
                        font: 'Arial',
                        size: 20
                    }),
                    new TextRun({
                        text: ` Australian Securities and Investment Commission (ASIC) database`,
                        font: 'Arial',
                        size: 20
                    }),
                    new TextRun({
                        text: " on ",
                        italics: true,
                        font: 'Arial',
                        size: 20
                    }),
                    new TextRun({
                        text: `[${checkSingle(date.getDate())} ${checkSingle(date.getMonth() + 1)} ${date.getFullYear()} ${getTime()}]`,
                        italics: true,
                        font: 'Arial',
                        size: 20,
                        shading: {
                            fill: '#FFFF00'
                        }
                    }),
                    new TextRun({
                        text: ".",
                        italics: true,
                        font: 'Arial',
                        size: 20
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `[Group Structure Diagram here]`,
                        italics: true,
                        bold: true,
                        font: 'Arial',
                        size: 20,
                        shading: {
                            fill: '#FFFF00'
                        },
                    })
                ],
                alignment: AlignmentType.CENTER,
                spacing: {
                    before: 120
                }
            })
        ]
    }
}

export const getIntroBySchedule1 = (): object[] => {
    const intro = new GenerateSchedule1Intro()
    return  intro.generate()
}
