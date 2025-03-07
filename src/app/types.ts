export type User = {
     id: number
     login: string
     password: string
     role: "USER" | "ADMIN"
     createdAt?: Date
     updatedAt?: Date
}

export type UpdateUser = {
     data: {
          login: string
          newPassword: string
          oldPassword: string
          role: ROLES
     }; id: number
}

export type TItem = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
}

export type UpdateTItem = {
     data: {
          name: string;
     }
     id: number;
}

export type Register = { login: string, password: string, role: "ADMIN" | "USER" }

export type NumberAdd = {
     dublicate: {
          name: any;
          count: number;
     }[];
     unique: number;
     incorrect: number;
     totalDublicate: number
}

export type NumberDelete = {
     incorrect: number;
     deleteNumber: number;
     notFoundNumber: number;
     user_id: number;
}

export type ParamlList = {
     city?: string,
     result?: string,
     typeNumber?: string,
     name?: string,
     dob?: string,
     blocking_status?: string,
     update_count?: string,
     guest?: string,
     first_call_date?: string,
     last_call_date?: string,
}

export type RaportImport = {
     import: number;
     incorrect: number;
}

export type TRaportUpdateNumberFile = { changes: number, notFoundNumber: number }

export type ImportHistory = {
     id: number
     dublicate: number
     unique: number
     incorrect: number
     login: string
     createdAt: Date
     updatedAt: Date
}

export type DeleteHistory = {
     id: number
     deleteNumber: number
     notFoundNumber: number
     incorrect: number
     login: string
     createdAt: Date
     updatedAt: Date
}

export type PageLimit = { limit: number, page: number }
export type Children = { children: React.ReactNode }


export enum ROLES {
     ADMIN = "ADMIN",
     USER = "USER",
     VIEWER = "VIEWER"
}

export type DublicateItem = {
     name: string;
     count: number;
}

export type Raport = {
     dublicate: DublicateItem[]
     incorrect: number,
     unique: number
     totalDublicate: number
}


export type MainRaport = {
     all_numbers: number
     color: string
     guests: number
     pairs: number
     "Не уверенный": number
     Но: number
     Отказ: number
     "Ошибка(возраст)": number
     "Ошибка(км)": number
     Согласие: number
     remainder: number
     procentRemainder: number
     procentGuests: number
     procentConsent: number
     numbersOneConsent: number
     name: string
}

export enum KeyMainRaport {
     all_numbers = "all_numbers",
     color = "color",
     guests = "guests",
     pairs = "pairs",
     "Не уверенный" = "Не уверенный",
     Но = "Но",
     Отказ = "Отказ",
     'Ошибка(возраст)' = 'Ошибка(возраст)',
     'Ошибка(км)' = 'Ошибка(км)',
     Согласие = "Согласие",
     remainder = "remainder",
     procentRemainder = "procentRemainder",
     procentGuests = "procentGuests",
     procentConsent = "procentConsent",
     numbersOneConsent = "numbersOneConsent",
     name = "name"
}

type FindInfoNumberHistories = {
     operator: string,
     presentation_date: string,
     presentation_time: string,
     note: string,
     call_date: string,
     result: {
          name: string
     }
}

export type FindInfoNumberGuests = {
     guests: number,
     pairs: number,
     date: string,
     time: string
}

export type FindInfoNumber = {
     id: number,
     number: string,
     full_name: string,
     dob: string,
     blocking_status: false,
     createdAt: string,
     updatedAt: string,
     city_id: number,
     type_number_id: number,

     city: {
          name: string
     },

     typeNumber: {
          name: string
     },

     histories: FindInfoNumberHistories[]
     guests: FindInfoNumberGuests[]
}

export type TFindNumber = {
     number: string
}

export type UpdateNumber = {
     full_name?: string,
     dob?: string,
     blocking_status?: string,
     city?: string,
     typeNumber?: string
}