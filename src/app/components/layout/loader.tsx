import { Loader } from "@mantine/core"

export const LoaderComponent = () => {
     return (
          <span className="flex justify-center items-center h-[90vh]">
               <Loader color="blue" size={50} />
          </span>
     )
}
