export interface IDataType {
  capital: string
  currency: string
  name: string
  phone: string
  population: number
  media: {
    flag: string
  }
}

export type SortItemName =
  | 'name'
  | 'capital'
  | 'currency'
  | 'phone'
  | 'population'
export type SortType = 'asc' | 'desc'
