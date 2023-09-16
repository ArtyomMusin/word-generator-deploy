import {Paragraph, Table, TableRow, TextRun} from 'docx'
import GenerateOfGeneral from '../generateOfGeneral'
import { IProprietorSearch, IData } from '../document'
import { config } from '../config'

class GenerateSchedule2Section extends GenerateOfGeneral {
    data: IProprietorSearch[]
    fullData: IData

    constructor(data: IProprietorSearch[], fullData: IData) {
        super()
        this.data = data
        this.fullData = fullData
    }

    generate() {
        console.log('data wd,duhwqdjwqopdkpo', this.data)
        return [
            super.createSchedule('Schedule 2: Intellectual Property Holdings'),
            super.createTitle(`1 Trade Mark Registrations`),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'We’ve conducted searches of the Australian Trade Marks Register for any registrations or applications by a member of the Target Corporate Group and for the key target brands. The results are from searches conducted on ',
                        size: 20,
                        font: config.font,

                    }),
                    new TextRun({
                        text: '[DD MONTH YEAR]',
                        size: 20,
                        font: config.font,
                        italics: true,
                        bold: true
                    })
                ],
                indent: {
                    left: 250
                }
            }),
            super.createSubTitle(`1.1 Trade marks registered by the Target Group (Proprietor Search)`),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'We’ve searched the Australian Trade Mark Register for registered trade marks held by entities in the Target Group.',
                        size: 20,
                        font: config.font
                    }),
                ],
                indent: {
                    left: 500
                }
            }),
            ...this.data
                .map(proprietorSearch => ([
                    super.createLetterItem(`Unilever IP Holdings B.V. (ACN: ${proprietorSearch.acn})`),
                    new Table({
                        ...this.getTableSettings(),
                        rows: [
                            new TableRow({
                                children: [
                                    super.createHeaderCell(`#`),
                                    super.createHeaderCell(`Trade Mark`),
                                    super.createHeaderCell(`Registered Proprietor`),
                                    super.createHeaderCell(`Class(es)`),
                                    super.createHeaderCell(`Conditions / limitations`),
                                    super.createHeaderCell(`Status`),
                                    super.createHeaderCell(`Renewal Due Date`),
                                    super.createHeaderCell(`Comments`)
                                ],
                            }),
                            ...proprietorSearch.trademarks.map(mark =>
                                new TableRow({
                                    children: [
                                        super.createCell(mark.number),
                                        super.createCell(''),
                                        super.createCell(''),
                                        // @ts-ignore
                                        super.createCell(mark.classes.length > 1 ? mark.classes.join(', ') : mark.classes),
                                        super.createCell(''),
                                        super.createCell(`${mark.statusCode}\n${mark.statusDetail}`),
                                        super.createCell(mark.renewalDueDate),
                                        super.createCell('')
                                    ],
                                })
                            )
                        ]
                    })
                ]))
                .reduce((wrap, item) => [...wrap, ...item], [])
        ]
    }

    private getTableSettings() {
        return {
            ...super.getTableTotalSettings(),
            float: {
                absoluteHorizontalPosition: 600
            }
        }
    }
}

export const getSectionBySchedule2 = (data: IProprietorSearch[], fullData: IData) => {
    const section = new GenerateSchedule2Section(data, fullData)
    return section.generate()
}
