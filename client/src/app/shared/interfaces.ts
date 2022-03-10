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
  ID?: number
  NAME?: string
  PRECENT?: number
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

export interface Statment {
  BRANCH_ID?: number
  ZAV_NUMBER?: string
  DATE_ZAV?: string
  STRAH_VZNOS?: number
  SELECT_ID_AGENT?: number
  AGENT_RASHOD?: number
  PERIOD?: string
  SROK_STRAH?: number
  MAIN_POKR?: number
  GOD_DOHOD?: number
  VIGODO_SMERT?: string
  VIGODO_ZHIZN?: string
  STRAHOVATEL?: number
  ZASTRAHOVAN?: number
  ANSWERS?: string
  EMPID?: number
  RISK?: string
}

export interface Vigodo {
  M_SICID?: number
  VIGODO_PRECENT?: string
  TYPE_VIGODA?: number
}

export interface Agent {
  KOD?: number
  NAME?: string
  CONTRACT_DATE_BEGIN?: Date
  CONTRACT_NUM?: string
}


export interface Nagruz {
  ID?: number
  NAME?: string
  TYPE?: string
  NAME_RISK?: string
}

export interface Pokr {
  ID?: number
  NAME?: string
  PMAIN?: number
}

export interface DopPokr {
  ID?: number
  NAME?: string
  PMAIN?: number
}

export interface DopPokrSum {
  ID?: number
  SUM?: string
}

export interface DopPokrStrahSum {
  DOP_POKRS_SUMS?: string
  CNCT_ID?: number
}

export interface Period {
  ID?: number,
  NAME?: string
}

export interface StatmentT {
  ID?: number,
  BRANCH_ID?: number,
  NUM_ZAV?: string,
  DATE_ZAV?: Date,
  STRAH_VZNOS?: number,
  AGENT?: number,
  AGENT_RASHOD?: number,
  PERIODICH?: number,
  SROK_STRAH?: number,
  MAIN_POKR?: number,
  CNCT_ID?: number,
  GOD_DOHOD?: number,
  PAYM_CODE?: number,
  STRAHOVATEL?: number,
  ZASTRAHOVAN?: number,
  STATE?: number,
  EMP_ID?: number,
  STRAH_SUM?: number,
  BCO?: string,
  PERIODICH_T?: string,
  DATE_BEGIN?: Date,
  DATE_END?: Date,

  TEST?: number
}

export interface Answers {
  "ID": number,
  "ID_QUESTION": number,
  "ID_ANSWER": string,
  "SICID_CLIENT": number,
  "STMNT_ID": number,
  "ID_1": number,
  "TEXT_QUESTION": string,
  "TYPE": number
}

export interface Client {
  "SICID": number,
  "LASTNAME": string,
  "FIRSTNAME": string,
  "MIDDLENAME": string,
  "BIRTHDATE": Date,
  "DEATH_DATE": Date,
  "SEX": string,
  "IIN": string
}

export interface Dpokr {
  "ID": number,
  "STRAH_SUM": number,
  "ID_DOP_POKR": number,
  "CNCT_ID": number,
  "ID_1": number,
  "NAME": string,
  "NAME_KZ": string,
  "ACTIVE": number,
  "PMAIN": number
}


export interface Obtain {
  "ID"?: number,
  "SICID"?: number,
  "SICID_OBTAIN"?: number,
  "PROC"?: number,
  "TYPE"?: number,
  "CNCT_ID"?: number,
  "FIO"?: string,


  TEST?: number
}


export interface Anderaiting {

  "SMERT_PO_LYUBOI_PRICHINE_PER"?: number,
  "SMERT_V_RES_NS_PER"?: number,
  "INVALID_PER_VTOR_RES_NS_PER"?: number,
  "TRAVMA_RES_NS_PER"?: number,
  "VREM_NETRUDOSPOSOB_NS_PER"?: number,
  "GOSPITAL_RES_NS_PER"?: number,
  "CNCT_ID"?: number,
  "ID_RISK"?: number,
  "SMERT_PO_LYUBOI_PRICHINE_PRO"?: number,
  "SMERT_V_RES_NS_PRO"?: number,
  "INVALID_PER_VTOR_RES_NS_PRO"?: number,
  "TRAVMA_RES_NS_PRO"?: number,
  "VREM_NETRUDOSPOSOB_NS_PRO"?: number,
  "GOSPITAL_RES_NS_PRO"?: number

}

export interface Rashet {
  "ID": number,
  "T1": number,
  "T2": number,
  "T3": number,
  "T4": number,
  "T5": number,
  "MAIN": number,
  "TARIF": number,
  "T1_SUM": number,
  "T2_SUM": number,
  "T3_SUM": number,
  "T4_SUM": number,
  "T5_SUM": number,
  "ID_1": number,
  "STRAH_SUM": number,
  "ID_DOP_POKR": number,
  "CNCT_ID": number,
  "ID_2": number,
  "NAME": string,
  "NAME_KZ": string,
  "ACTIVE": number,
  "PMAIN": number

}



