import { Children } from '../../types'

export const ScrolContainer: React.FC<Children> = ({ children }) => {
     return (<div className="flex flex-col gap-3 overflow-y-scroll max-h-[600px] p-1">{children}</div >)
}
