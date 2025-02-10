import { Loader } from "@mantine/core"

export const LoaderComponent: React.FC<{ styles?: string }> = ({ styles }) => {
     return (
          <span className={`flex justify-center items-center ${styles}`}>
               <Loader color="blue" size={50} />
          </span>
     )
}
