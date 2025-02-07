import { Container } from "./container"
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
     selectIsAuthenticated,
} from "../../../features/user/userSlice"
import { useEffect } from "react"
import { NavbarNested } from "./navbar-nested/navbar-nested"
import { MainPage } from "../../../pages/main-page"

export const Layout = () => {

     const isAuthenticated = useSelector(selectIsAuthenticated)
     const navigate = useNavigate()

     useEffect(() => {
          if (!isAuthenticated) {
               navigate(`/auth`)
          }
     }, [isAuthenticated, navigate])


     return (
          <Container>
               <NavbarNested />
               <section className="w-[100%] p-1">
                    <Outlet />
               </section>
          </Container>
     )
}