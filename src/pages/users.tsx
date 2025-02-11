import { Divider } from "@mantine/core"
import { RegistrationForm } from "../app/components/registration-form"
// import { UserList } from "../app/components/user-list"
import { useGetAllUsersQuery } from "../app/services/userApi"
import { LoaderComponent } from "../app/components/loader"
import { User } from "../app/components/user"
import { ScrolContainer } from "../app/components/layout/scrol-container"


export const Users = () => {
     const { data, isLoading } = useGetAllUsersQuery()

     return (
          <div className="flex flex-col">
               <RegistrationForm />
               <Divider my="sm" />
               <ScrolContainer>
                    <>
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
                    </>
               </ScrolContainer>
          </div>
     )
}
