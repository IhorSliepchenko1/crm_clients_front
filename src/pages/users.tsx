import { Divider } from "@mantine/core"
import { RegistrationForm } from "../app/components/registration-form"
import { UserComponent } from "../app/components/user-component"

export const Users = () => {
     return (
          <div className="flex flex-col">
               <RegistrationForm />
               <Divider my="sm" />
               <UserComponent />
          </div>
     )
}
