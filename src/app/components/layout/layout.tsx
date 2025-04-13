import { Container } from "./container"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../../features/user/userSlice"
import { useEffect } from "react"
import { NavbarNested } from "./navbar-nested/navbar-nested"
import { useCheckValidToken } from "../../hooks/useCheckValidToken"
import { useAppDispatch } from "../../hooks"

export const Layout = () => {

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const dispatch = useAppDispatch()
     const navigate = useNavigate()

     useEffect(() => {
          if (!isAuthenticated) {
               navigate(`/auth`)
          }
     }, [isAuthenticated, navigate])

     const { decoded } = useCheckValidToken()

     if (!decoded.key) {
          dispatch(logout())
     }

     return (
          <Container>
               <NavbarNested />
               <section className="w-[100%] p-2">
                    <Outlet />
               </section>
          </Container>
     )
}