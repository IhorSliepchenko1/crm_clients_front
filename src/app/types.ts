export type User = {
     id?: number
     login: string
     password: string
     role?: "USER" | "ADMIN"
     createdAt?: Date
     updatedAt?: Date
}

export type UpdateUser = {
     data: {
          login: string
          newPassword: string
          oldPassword: string
          role: string
     }; id: number
}

export type City = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
}

export type Result = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
}

export type TypeNumber = {
     id: number
     name: string
     createdAt: Date
     updatedAt: Date
}

export type Register = { login: string, password: string, role: "ADMIN" | "USER" }

export type NumberAdd = {
     dublicate: {
          name: any;
          count: number;
     }[];
     unique: number;
     incorrect: number;
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

// export type CopyNumber = {
//      id: number
//      number: string
//      full_name: string
//      dob: string
//      blocking_period: string
//      name_import_result_file: string
//      name_import_guest_file: string
//      createdAt: Date
//      updatedAt: Date
// }

// export type ResultHistories = {
//      id: number
//      operator: string
//      note: string
//      call_date: string
//      number_id: number
//      result_id: number
//      name_import_result_file: string
//      createdAt: Date
//      updatedAt: Date
// }

// type TimeString = `${number}:${number}:${number}`;

// export type Guest = {
//      id: number
//      date: string
//      time: TimeString
//      guests: number
//      pairs: number
//      name_import_guest_file: string
//      number_id: number
//      createdAt: Date
//      updatedAt: Date
// }

export type ImportHistory = {
     id: number
     dublicate: number
     unique: number
     incorrect: number
     user_id: number
     createdAt: Date
     updatedAt: Date
}

export type DeleteHistory = {
     id: number
     deleteNumber: number
     notFoundNumber: number
     incorrect: number
     user_id: number
     createdAt: Date
     updatedAt: Date
}

export type PageLimit = { limit: number, page: number }

export type Children = { children: React.ReactElement[] | React.ReactElement }
