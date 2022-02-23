export type FinanceStatus = {
  message?: string
  timestamp: string
  principalTotals: number
  interestTotals: number
  costTotals: number
  statusTotals: number
  organizations: Array<any>
}

export type FinanceStatusDetails = {
  foo: string
}

export type CustomerChargeType = {
  chargeType: CustomerChargeTypeItem[]
}

export type CustomerChargeTypeItem = {
  id: string
  name: string
}

export type CustomerRecords = {
  records: CustomerRecordsDetails[]
}

export type CustomerRecordsDetails = {
  createDate: string
  createTime: string
  valueDate: string
  performingOrganization: string
  collectingOrganization: string
  chargeType: string
  itemCode: string
  chargeItemSubject: string
  periodType: string
  period: string
  amount: number
  category: string
  subCategory: string
  actionCategory?: string
  reference: string
  referenceToLevy: string
  accountReference: string
}

export type DocumentDataTypes = {
  type: string
  document: string
}

export type TapsControlTypes = {
  RecordsTap: boolean
  employeeClaimsTap: boolean
  localTaxTap: boolean
}

export type AnnualStatusTypes = {
  year: string
}

export type DocumentTypes = {
  docment: DocumentDataTypes
}

export type DocumentsListTypes = {
  documentsList: DocumentsListItemTypes[]
}

export type DocumentsListItemTypes = {
  id: string
  date: string
  type: string
  note?: string | null
  sender: string
  dateOpen: string
  amount: number
}
