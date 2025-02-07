import { Children } from "../../types"

export const Container: React.FC<Children> = ({ children }) => {
     return <div className="flex">{children}</div>
}