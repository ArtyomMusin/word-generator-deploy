import {
    Footer,
    Header, HeadingLevel,
    PageNumber,
    PageOrientation,
    Paragraph, TableCell, TabStopPosition, TabStopType,
    TextRun,
    WidthType
} from 'docx'
import { config } from './config'
import { IData, IProject } from './document'
import { checkSingle } from './utils'

class GenerateOfGeneral{
    protected getTableTotalSettings() {
        return {
            margins: {
                left: 100,
                right: 100,
                top: 50,
                bottom: 50
            }
        }
    }

    public setPagesProperties() {
        return {
            page: {
                size: {
                    orientation: PageOrientation.LANDSCAPE,
                },
            },
        }
    }

    public createHeader(data: IProject) {
        const timestamp = new Date()
        const date = `${checkSingle(timestamp.getDate())}/${checkSingle(timestamp.getMonth() + 1)}/${timestamp.getFullYear()}`
        return new Header({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: data?.name,
                            ...config.listLevel1,
                        }),
                        // new ImageRun({
                        //     data: (data?.img),
                        //     transformation: {
                        //         width: 114,
                        //         height: 57,
                        //     },
                        //     floating: {
                        //         horizontalPosition: {
                        //             relative: HorizontalPositionRelativeFrom.RIGHT_MARGIN,
                        //             offset: -1220400,
                        //         },
                        //         verticalPosition: {
                        //             relative: VerticalPositionRelativeFrom.TOP_MARGIN,
                        //             offset: 350400,
                        //         },
                        //     }
                        // })
                    ],
                    spacing: {
                        before: 50,
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Date: ${date}`,
                            font: config.font
                        })
                    ]
                })
            ],
        })
    }

    public createFooter(data: IProject) {
        return new Footer({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: data.matterNumber,
                            font: config.font,
                            size: 20
                        }),
                        new TextRun({
                            children: ["\t\t\t\t\t\t\tPage ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
                            font: config.font,
                            size: 20
                        })
                    ],
                    tabStops: [
                        {
                            type: TabStopType.RIGHT,
                            position: TabStopPosition.MAX,
                        }
                    ]
                }),
            ],
        })
    }

    public getGeneral(data: IData) {
        return {
            properties: this.setPagesProperties(),
            headers: {
                default: this.createHeader(data.project)
            },
            footers: {
                default: this.createFooter(data.project)
            }
        }
    }

    public createSchedule(text: string){
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    color: '#575AEF',
                    size: 28,
                    font: config.font,
                    bold: true
                })
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: {
                before: 450,
                after: 300
            }
        })
    }

    public createTitle(text: string) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    ...config.listLevel1
                })
            ],
            numbering: {
                reference: "section-title",
                level: 0
            },
            spacing: {
                after: 200
            }
        })
    }

    public createSubTitle (text: string) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    ...config.listLevel2
                })
            ],
            numbering: {
                reference: "section-sub-title",
                level: 1
            },
            spacing: {
                before: 200,
                after: 100
            },

        })
    }

    public createLetterItem (text: string) {
        return new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    ...config.listLevel3
                })
            ],
            numbering: {
                reference: "section-letter-list",
                level: 2
            },
            spacing: {
                before: 200,
                after: 100
            },

        })
    }

    public createCell (text: string | number, width?: number) {
        const w = width ? {
            width: {
                size: width
            }
        } : {}

        return new TableCell({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: String(text),
                            size: 20,
                            font: config.font
                        })
                    ]
                })
            ],
            ...w
        })
    }

    public createFirstColumnCell (text: string, subText?: string, rowspan?: number) {
        return new TableCell({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: text,
                            bold: true,
                            size: 20,
                            font: config.font
                        }),
                        new TextRun({
                            text: subText,
                            size: 20,
                            font: config.font
                        })
                    ]
                })
            ],
            shading: {
                fill: "#D0CECE",
            },
            rowSpan: rowspan
        })
    }

    public createHeaderCell (text: string, subText?: string) {
        return new TableCell({
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: text,
                            bold: true,
                            size: 20,
                            font: config.font,
                            color: '#FFFFFF'
                        })
                    ]
                })
            ],
            shading: {
                fill: "#575AEF"
            }
        })
    }
}

export default GenerateOfGeneral
