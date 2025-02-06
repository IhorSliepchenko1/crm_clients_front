import { useCheckQuery } from "../app/services/userApi"

export const AuthGuard: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
     const { isLoading } = useCheckQuery()

     if (isLoading) {
          return <div className="flex gap-2 p-10">
               <p>...loading</p>
               <p>...loading</p>
          </div>
     }
     return children
}