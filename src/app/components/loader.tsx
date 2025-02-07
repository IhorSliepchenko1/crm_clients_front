import { Loader } from "@mantine/core"

export const LoaderComponent = () => {
     return (
          <div className="relative h-screen w-screen">
               <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader color="cyan" size="lg" type="bars" />
               </span>
          </div>
     )
}
