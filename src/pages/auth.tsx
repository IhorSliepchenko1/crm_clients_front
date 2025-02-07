import { Card } from "@mantine/core"
import { SwitchTheme } from "../app/components/switch-theme"
import { Login } from "../features/user/login"

export const Auth = () => {

     return (
          <div className="flex items-center justify-center h-screen">
               <div className="absolute top-0 right-0 p-4">
                    <SwitchTheme />
               </div>
               <div className="max-w-xl w-full p-2">
                    <Card className="min-w-full w-[340px]">
                         <div className="overflow-hidden">
                              <h2 className="py-3">Войдите в аккаунт</h2>
                              <Login />
                         </div>
                    </Card>
               </div>
          </div>
     )
}