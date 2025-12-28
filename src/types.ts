export interface CountryRegulation {
  countryCode: string
  countryName: string
  regulatoryStatus: 'regulated' | 'developing' | 'unclear' | 'prohibited'
  lastUpdated: string
  summary: string
  keyRegulators: string[]
  regulations: RegulationDetail[]
  sources: Source[]
}

export interface RegulationDetail {
  title: string
  description: string
  effectiveDate?: string
  url?: string
}

export interface Source {
  title: string
  url: string
  date: string
}

export type RegulationsData = Record<string, CountryRegulation>
