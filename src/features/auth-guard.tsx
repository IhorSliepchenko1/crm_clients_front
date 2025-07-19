import { useCheckQuery } from "../app/services/userApi";
import { Children } from "../app/types";
import { LoaderComponent } from "../app/components/layout/loader";

export const AuthGuard: React.FC<Children> = ({ children }) => {
  const { isLoading } = useCheckQuery();
  console.log(isLoading);

  return isLoading ? <LoaderComponent /> : <>{children}</>;
};
