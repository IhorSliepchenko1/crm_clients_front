import { Children } from "../../types"

export const Container: React.FC<Children> = ({ children }) => {
     return <div className="flex justify-between">{children}</div>
}