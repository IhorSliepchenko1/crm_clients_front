import { Divider } from "@mantine/core"
import { AddUserForm } from "../app/components/add-form/add-user-form"
import { UserComponent } from "../app/components/features/user/user-component"

export const Users = () => {
     return (
          <>
               <AddUserForm />
               <Divider my="sm" />
               <UserComponent />
          </>
     )
}
