import { forwardRef } from "react";

type Props = {
     children: React.ReactNode;
};

export const ContainerPDFimportNumbers = forwardRef<HTMLDivElement, Props>(
     ({ children }, ref) => {
          return (
               <div
                    // style={{ width: "800px", margin: "0 auto" }}
                    ref={ref}
                    className="flex flex-col justify-between min-w-[40vw] border-2 p-4 bg-white text-black"
               >
                    {children}
               </div>
          );
     }
);
