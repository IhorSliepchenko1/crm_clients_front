import { Divider } from "@mantine/core"
import { RegistrationForm } from "../app/components/registration-form"
import { UserList } from "../app/components/user-list"


export const Registration = () => {
     return (
          <div>
               <RegistrationForm />
               <Divider my="sm" />
               <UserList />
          </div>
     )
}
