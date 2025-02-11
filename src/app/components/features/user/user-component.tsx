import { useGetAllUsersQuery } from "../../../services/userApi"
import { ScrolContainer } from "../../layout/scrol-container"
import { LoaderComponent } from "../../layout/loader"
import { User } from "../item/user"

export const UserComponent = () => {
     const { data, isLoading } = useGetAllUsersQuery()

     return (
          <ScrolContainer>
               {isLoading
                    ? <LoaderComponent styles="h-[50vh]" />
                    : data?.map((item) => (
                         <User
                              key={item.id}
                              role={item.role}
                              login={item.login}
                              id={item.id}
                         />))}
          </ScrolContainer>
     )
}
