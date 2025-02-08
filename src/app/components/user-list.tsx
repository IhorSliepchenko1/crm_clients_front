import { useGetAllUsersQuery } from "../services/userApi"
import { LoaderComponent } from "./loader"
import { User } from "./user"

export const UserList = () => {
     const { data, isLoading } = useGetAllUsersQuery()

     return (
          <div className="flex flex-col gap-3">
               {
                    isLoading
                         ? <LoaderComponent styles="h-[50vh]" />
                         : data?.map((item) => (
                              <User
                                   key={item.id}
                                   role={item.role}
                                   login={item.login}
                                   id={item.id}
                              />
                         ))
               }

          </div>
     )
}
