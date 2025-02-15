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
     name: string
     id: number
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
     blocking_period?: string,
     update_count?: string,
     guest?: string,
     first_call_date?: string,
     last_call_date?: string,
}

export type RaportImport = {
     import: number;
     incorrect: number;
}

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
