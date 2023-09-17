import { WidthType } from 'docx'
import GenerateOfGeneral from '../generateOfGeneral'
import { IData, IPPSR } from '../document'

class GenerateSchedule3Section extends GenerateOfGeneral {
    data: IPPSR[]
    fullData: IData

    constructor(data: IPPSR[], fullData: IData) {
        super()
        this.data = data
        this.fullData = fullData
    }

    generate() {
        return [
            super.createSchedule('Schedule 3: PPSR Registrations'),
            super.createSubTitle(`1 Summary`),
            super.createSubTitle(`2 Superloop Limited (ACN 169 263 094 // ABN 96 169 263 094)`),
            super.createSubTitle(`3 Superloop (Operations) Pty Ltd `)
        ]
    }

    private getTableSettings() {
        return {
            ...super.getTableTotalSettings(),
            float: {
                absoluteHorizontalPosition: 2000
            },
            width: {
                size: 10000,
                type: WidthType.DXA,
            }
        }
    }
}

export const getSectionBySchedule3 = (data: IPPSR[], fullData: IData) => {
    const section = new GenerateSchedule3Section(data, fullData)
    return section.generate()
}
