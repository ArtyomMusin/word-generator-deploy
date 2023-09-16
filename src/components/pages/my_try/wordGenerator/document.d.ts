export interface IProject {
    name: string
    description: string
    matterNumber: string
}

export interface IShareholderMember {
    isJointHolding: boolean
    name: string
    type: string
}

export interface IShareholding {
    beneficiallyOwned: boolean
    classCode: string
    documentNumber: string
    fullyPaid: boolean
    members: IShareholderMember[]
    numberHeld: number
}

export interface IOffice {
    appointmentDate: string
    dateOfBirth: string
    documentNumber: string
    fullAddress: string
    fullName: string
    placeOfBirth: string
}

export interface ICurrentAsicExtract {
    organisation: {
        name: string
        type: string
        class: string
        subClass: string
        registrationDate: string
        state: string
    },
    addresses: {
        registeredAddress: {
            address: string
        },
        principalPlaceOfBusiness: {
            address: string
        }
    },
    shareStructure: [{
        class: string
        description: string
        documentNumber: string
        numberIssued: number
        totalAmountPaid: number
        totalAmountUnpaid: number
    }],
    shareholdings: IShareholding[],
    officeHolders: object
}

export interface IProprietorSearch {
    formerNames: [],
    acn: string,
    trademarks: [{
        number: string
        classes: number[] | string[]
        statusCode: string
        statusDetail: string
        renewalDueDate: string
    }]
}

export interface IData {
    project: IProject,
    currentAsicExtracts: ICurrentAsicExtract[],
    proprietorSearches: IProprietorSearch[]
}
