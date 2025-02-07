import { Children } from "../../types"

export const Container: React.FC<Children> = ({ children }) => {
     return <div className="flex max-w-screen-xl mx-auto pt-15">{children}</div>
}