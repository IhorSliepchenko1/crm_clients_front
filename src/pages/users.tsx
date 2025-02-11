import { Divider } from "@mantine/core"
import { RegistrationForm } from "../app/components/registration-form"
import { UserComponent } from "../app/components/user-component"

export const Users = () => {
     return (
          <>
               <RegistrationForm />
               <Divider my="sm" />
               <UserComponent />
          </>
     )
}
