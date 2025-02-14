import { useGetAllUsersQuery } from "../../../services/userApi"
import { LoaderComponent } from "../../layout/loader"
import { User } from "./user"
import { ROLES } from "../../../types"

export const UserComponent = () => {
     const { data, isLoading } = useGetAllUsersQuery()

     return (
          <div className="flex flex-col gap-1">
               {isLoading
                    ? <LoaderComponent styles="h-[50vh]" />
                    : data?.map((item) => (
                         <User
                              key={item.id}
                              role={item.role as ROLES}
                              login={item.login}
                              id={item.id}
                         />))}
          </div>
     )
}
