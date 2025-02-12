import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../hooks";
import { useMemo } from "react";
import { ROLES } from "../types";

type DecodedToken = {
     exp: number;
     iat: number;
     id: number;
     login: string;
     role: ROLES;
}

export const useCheckValidToken = () => {
     const { token } = useAppSelector((state) => state.auth)

     const decoded: DecodedToken = useMemo(() => {
          if (typeof token === `string`) {
               return jwtDecode(token);
          } else {
               return {
                    exp: 0,
                    iat: 0,
                    id: 0,
                    login: "",
                    role: ROLES.VIEWER,
               }
          }
     }, [token])

     return { decoded }

}