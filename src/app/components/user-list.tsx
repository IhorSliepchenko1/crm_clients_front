import { useGetAllUsersQuery } from "../services/userApi"
import { LoaderComponent } from "./loader"
import { User } from "./user"

export const UserList = () => {
     const { data, isLoading } = useGetAllUsersQuery()

     return (
          <div className="flex flex-col gap-3">
               {
                    isLoading
                         ? <LoaderComponent />
                         : data?.map((item) => (
                              <User
                                   role={item.role as "USER" | "ADMIN"}
                                   login={item.login}
                                   id={item.id as number}
                              />
                         ))
               }
          </div>
     )
}
