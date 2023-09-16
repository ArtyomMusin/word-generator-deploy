import { Paragraph, Table, TableRow, TextRun } from 'docx'
import GenerateOfGeneral from '../generateOfGeneral'
import { ICurrentAsicExtract, IData, IOffice, IShareholding } from '../document'
import { dateFormat, getDifferentYearsFromNow } from '../utils'
import { config } from '../config'

class GenerateSchedule1Section extends GenerateOfGeneral {
    data: ICurrentAsicExtract
    fullData: IData

    constructor(data: ICurrentAsicExtract, fullData: IData) {
        super()
        this.data = data
        this.fullData = fullData
    }

    generate(index: number) {
        return [
            super.createTitle(`${index + 1} ${this.data?.organisation?.name}`),
            super.createSubTitle(`${index + 1}.1 Entity Details`),
            new Table({
                ...this.getTableSettings(),
                rows: [
                    new TableRow({
                        children: [
                            super.createFirstColumnCell('Type // Class // Sub Class'),
                            super.createCell(`${this.data.organisation.type} // ${this.data.organisation.class} // ${this.data.organisation.subClass}`)
                        ],
                    }),
                    new TableRow({
                        children: [
                            super.createFirstColumnCell('Date of Registration'),
                            super.createCell(dateFormat(this.data.organisation.registrationDate))
                        ],
                    }),
                    new TableRow({
                        children: [
                            super.createFirstColumnCell('Place of Registration'),
                            super.createCell(this.data.organisation.state)
                        ],
                    }),
                    new TableRow({
                        children: [
                            super.createFirstColumnCell('Registered Office ', '(start date)'),
                            super.createCell(this.data.addresses.registeredAddress.address)
                        ],
                    }),
                    new TableRow({
                        children: [
                            super.createFirstColumnCell('Principal Place of Business ', '(start date)'),
                            super.createCell(this.data.addresses.principalPlaceOfBusiness.address)
                        ],
                    }),
                    new TableRow({
                        children: [
                            super.createFirstColumnCell('Former Names ', '(start date)'),
                            super.createCell(this.fullData.proprietorSearches[index].formerNames.join(', '))
                        ],
                    })
                ],
            }),
            super.createSubTitle(`${index + 1}.2 Share Structure`),
            new Table({
                ...this.getTableSettings(),
                rows: [
                    new TableRow({
                        children: [
                            super.createHeaderCell(`Class`),
                            super.createHeaderCell(`Description`),
                            super.createHeaderCell(`Number Issued`),
                            super.createHeaderCell(`Total Amount Paid`),
                            super.createHeaderCell(`Total Amount Unpaid`)
                        ],
                    }),
                    ...this.data.shareStructure.map(item =>
                        new TableRow({
                            children: [
                                super.createCell(item.class),
                                super.createCell(item.description),
                                super.createCell(item.numberIssued),
                                super.createCell(item.totalAmountPaid),
                                super.createCell(item.totalAmountUnpaid)
                            ],
                        }),
                    )
                ]
            }),
            super.createSubTitle(`${index + 1}.3 Shareholders`),
            this.getShareholders(this.data.shareholdings),
            super.createSubTitle(`${index + 1}.4 Officeholders`),
            new Table({
                ...this.getTableSettings(),
                rows: [
                    new TableRow({
                        children: [
                            super.createHeaderCell(`Office`),
                            super.createHeaderCell(`Name`),
                            super.createHeaderCell(`Appointment Date`),
                            super.createHeaderCell(`Years in role`),
                            super.createHeaderCell(`Born`)
                        ],
                    }),
                    ...Object.keys(this.data.officeHolders)
                        .map((office: string) =>
                            // @ts-ignore
                            this.data.officeHolders[office].map((person: IOffice, i: number) => {
                                const getOfficeName = (name: string) => {
                                    // @ts-ignore
                                    console.log(this.data.officeHolders[office])
                                    switch (name) {
                                        case 'directors': return 'Directors'
                                        case 'secretaries': return 'Company Secretary'
                                        default: return name
                                    }
                                }
                                return new TableRow({
                                    children: i === 0 ? [
                                        // @ts-ignore
                                        super.createFirstColumnCell(getOfficeName(office), '', i === 0 ? this.data.officeHolders[office].length : 0),
                                        super.createCell(person.fullName),
                                        super.createCell(dateFormat(person.appointmentDate)),
                                        super.createCell(getDifferentYearsFromNow(person.appointmentDate)),
                                        super.createCell(`${dateFormat(person.dateOfBirth)} ${person.placeOfBirth}`)
                                    ] : [
                                        super.createCell(person.fullName),
                                        super.createCell(dateFormat(person.appointmentDate)),
                                        super.createCell(getDifferentYearsFromNow(person.appointmentDate)),
                                        super.createCell(`${dateFormat(person.dateOfBirth)} ${person.placeOfBirth}`)
                                    ],
                                })
                            })
                        )
                        .reduce((wrap, item) => [...wrap, ...item], [])
                ]
            })
        ]
    }

    private getShareholders(data: IShareholding[]): object {
        if (!data.length) {
            return new Paragraph({
                children: [
                    new TextRun({
                        text: 'Information not available from ASIC. ',
                        color: '#000000',
                        size: 22,
                        font: config.font
                    }),
                    new TextRun({
                        text: '[because listed public company?]',
                        color: '#000000',
                        size: 22,
                        font: config.font,
                        bold: true,
                        italics: true,
                        shading: {
                            fill: '#F4F400'
                        }
                    })
                ],
                spacing: {
                    after: 200
                },
                indent: {
                    left: 600
                }
            })
        }

        return new Table({
            ...this.getTableSettings(),
            rows: [
                new TableRow({
                    children: [
                        super.createHeaderCell(`Name`),
                        super.createHeaderCell(`Conditions`),
                        super.createHeaderCell(`Share Class`),
                        super.createHeaderCell(`Fully Paid`),
                        super.createHeaderCell(`Jointly Held?`),
                        super.createHeaderCell(`Number Held`),
                        super.createHeaderCell(`Ownership %`)
                    ],
                }),
                ...data
                    .map(shareholder =>
                        shareholder.members.map(member =>
                            new TableRow({
                                children: [
                                    super.createCell(member.name),
                                    super.createCell(shareholder.beneficiallyOwned ? 'Beneficially Owned' : ''),
                                    super.createCell(shareholder.classCode),
                                    super.createCell(shareholder.fullyPaid ? 'Yes' : 'No'),
                                    super.createCell(member.isJointHolding ? 'Yes' : 'No'),
                                    super.createCell(shareholder.numberHeld),
                                    super.createCell(100 / shareholder.members.length)
                                ],
                            })
                        )
                    )
                    .reduce((wrapper, array) => [...wrapper, ...array], [])
            ]
        })
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

export const getSectionBySchedule1 = (data: ICurrentAsicExtract, fullData: IData, i: number) => {
    const section = new GenerateSchedule1Section(data, fullData)
    return section.generate(i)
}
