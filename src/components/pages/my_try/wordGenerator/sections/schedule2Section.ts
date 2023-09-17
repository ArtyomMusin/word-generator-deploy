import {Paragraph, Table, TableRow, TextRun, WidthType} from 'docx'
import GenerateOfGeneral from '../generateOfGeneral'
import {IProprietorSearch, IData, ITradeMark} from '../document'
import { config } from '../config'
import {dateFormat, getLetterPoint, requestAndConvertImg} from "../utils";

class GenerateSchedule2Section extends GenerateOfGeneral {
    data: IProprietorSearch[]
    fullData: IData

    constructor(data: IProprietorSearch[], fullData: IData) {
        super()
        this.data = data
        this.fullData = fullData
    }

    async generate() {
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
            ...[...await Promise.all(this.data.map(async(proprietorSearch, i) => ([
                    super.createLetterItem(`${getLetterPoint(i)}.  ${proprietorSearch.name} (ACN: ${proprietorSearch.acn})`),
                    proprietorSearch.trademarks.length ? (
                        await this.createTradeMarkTable(proprietorSearch.trademarks)
                    ) : (
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: 'No results.',
                                    font: config.font,
                                    size: 20
                                })
                            ],
                            indent: {
                                left: 600
                            }
                        })
                    )
                ])))].reduce((wrap, item) => [...wrap, ...item], []),
            super.createSubTitle(`1.2 Trade Mark search for Target’s key brands`),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'We’ve searched the Australian Trade Mark Register for the key target brands associated with the Target provided to us on [X date] and identified these results.',
                        size: 20,
                        font: config.font
                    }),
                ],
                indent: {
                    left: 500
                }
            }),
            super.createLetterItem(`a. Key target brand: Paddle Pop`),
            super.createLetterItem(`b. Key target brand 2`),
            super.createLetterItem(`c. Key target brand 3`),
            super.createTitle(`2 Trade Mark Registrations`),
            super.createSubTitle(`2.1 Business names registered by the Target Group`),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'We’ve searched the Australian Business Name Register for registered business names held by entities in the Target Group',
                        size: 20,
                        font: config.font
                    }),
                ],
                indent: {
                    left: 500
                }
            }),
            super.createLetterItem(`a. Target Group Member 1`),
            super.createLetterItem(`b. Target Group Member 2`),
            super.createLetterItem(`c. Target Group Member 3`),
            super.createSubTitle(`2.2 Business name search for key brands`),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'We’ve searched the Australian Business Name Register for registered business names similar to the key target brands associated with the Target provided to us on ',
                        size: 20,
                        font: config.font
                    }),new TextRun({
                        text: '[X date].',
                        size: 20,
                        font: config.font,
                        bold: true,
                        italics: true
                    }),

                ],
                indent: {
                    left: 500
                }
            }),
            super.createLetterItem(`a. Key brand 1`),
            super.createLetterItem(`b. Key brand 2`),
            super.createTitle(`3 Domain Names`),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'We’ve searched domain name registers (Instra and Whois) for domain name registrations featuring key brands associated with the Target Group as ',
                        size: 20,
                        font: config.font
                    }),new TextRun({
                        text: '[X date].',
                        size: 20,
                        font: config.font,
                        bold: true,
                        italics: true
                    }),

                ],
                indent: {
                    left: 500
                }
            }),
            super.createSubTitle(`3.1 Domain Name search for key brands`),
            super.createLetterItem(`a. Key brand 1`),
            super.createLetterItem(`b. Key brand 2`),
            super.createSubTitle(`3.2 Domain Name verification (from list in data room)`),

        ]
    }

    private async createTradeMarkTable(data: ITradeMark[]) {
        return new Table({
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
                ...await Promise.all(data.map(async mark =>
                    new TableRow({
                        children: [
                            super.createCell(mark.number),
                            super.createCell(mark.image ? await requestAndConvertImg(mark.image) : '', 300),
                            super.createCell(''),
                            // @ts-ignore
                            super.createCell(mark.classes.length > 1 ? mark.classes.join(', ') : mark.classes),
                            super.createCell(''),
                            super.createCell(`${mark.statusCode}\n${mark.statusDetail}`),
                            super.createCell(dateFormat(mark.renewalDueDate, true)),
                            super.createCell('')
                        ],
                    })
                ))
            ]
        })
    }

    private getTableSettings() {
        return {
            ...super.getTableTotalSettings(),
            float: {
                absoluteHorizontalPosition: 1000
            },
            width: {
                size: 12200,
                type: WidthType.DXA,
            }
        }
    }
}

export const getSectionBySchedule2 = async (data: IProprietorSearch[], fullData: IData) => {
    const section = new GenerateSchedule2Section(data, fullData)
    return await section.generate()
}
