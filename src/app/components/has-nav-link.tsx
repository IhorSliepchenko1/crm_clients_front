import { NavLink } from "react-router-dom"

type Props = {
  children: React.ReactElement[] | React.ReactElement,
  link?: string
  hasLinks: boolean
}

export const HasNavLink: React.FC<Props> = ({ children, hasLinks, link }) => {
  return (
    !hasLinks ? <NavLink
      to={link as string}
    >
      {children}
    </NavLink> : children
  )
}
