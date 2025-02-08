import { Loader } from "@mantine/core"

export const LoaderComponent: React.FC<{ styles?: string }> = ({ styles }) => {
     return (
          <span className={`flex justify-center items-center ${styles}`}>
               <Loader color="cyan" size="lg" type="bars" />
          </span>
     )
}
