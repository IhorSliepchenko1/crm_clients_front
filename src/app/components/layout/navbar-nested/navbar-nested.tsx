import classes from "./navbar-nested.module.scss";
import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "../../links-group/links-group";
import { SwitchTheme } from "../../ui/switch-theme";
import { useCheckValidToken } from "../../../hooks/useCheckValidToken";
import { logout } from "../../../../features/user/userSlice";
import { useAppDispatch } from "../../../hooks";
import { data } from "./navbar-nested-data";
import { ROLES } from "../../../types";

export const NavbarNested = () => {
     const dispatch = useAppDispatch()

     const logoutSession = () => {
          dispatch(logout())
     }

     const mockdata = data(logoutSession)
     const { decoded } = useCheckValidToken()

     const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} role={decoded.role} access={item.access as [ROLES]} />)

     return (
          <nav className={classes.navbar}>
               <div className={classes.header}>
                    <div className="flex items-center justify-between w-[100%]">
                         <p>{decoded.login}</p>
                         <SwitchTheme />
                    </div>
               </div>

               <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>
                         {links}
                    </div>

               </ScrollArea>
          </nav>
     )
}
