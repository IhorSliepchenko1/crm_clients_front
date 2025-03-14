import { Divider } from "@mantine/core"
import { AddUserForm } from "../app/components/form/add-user-form"
import { UserComponent } from "../app/components/features/user/user-component"
// import { CreateRaport } from "../app/components/button/create-raport"

export const Users = () => {
     return (
          <>
               {/* <div className="flex justify-end">
                    <CreateRaport />
               </div> */}
               <AddUserForm />
               <Divider my="sm" />
               <UserComponent />
          </>
     )
}
