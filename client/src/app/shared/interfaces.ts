export interface User {
  email: string
  password: string
}

export interface Message {
  message: string

}


export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
  quantity?: number
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
  _id?: string
}



export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string

}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface OverviewPage {
  orders: OverviewPageItem
  gain: OverviewPageItem

}

export interface OverviewPageItem {
  precent: number
  compare: number
  yesterday: number
  isHigher: boolean

}

export interface AnalyticsPage {
  average: number
  chart: AnalyticsChartItem[]

}

export interface AnalyticsChartItem {
  gain:number
  order:number
  label: string
}

export interface TestNsj {
  ID?: string
  NAME?: string
}


export interface findIIN {
  ID?: Date
}

export interface DataIIN {
  ID?: number
  NAME?: string
  TYPE_CLIENT?: number
}

export interface Region {
  RFBN_ID: number
  NAME: string
}
export  interface Numzav {
  CN: string
}

export  interface Question {
  ID: number
  TEXT_QUESTION: string
  TYPE: number
}

export  interface Answer {
  ID_QUESTION: number
  ID_ANSWER: string
  ID_MAIN_QUESTION?: number
}




