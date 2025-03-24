import { forwardRef } from "react";

type Props = {
     children: React.ReactNode;
};

export const ContainerPDFimportNumbers = forwardRef<HTMLDivElement, Props>(
     ({ children }, ref) => {
          return (
               <div
                    ref={ref}
                    className="flex flex-col justify-between min-w-[40vw] border-2 border-dashed p-4 bg-white text-black"
               >
                    {children}
               </div>
          );
     }
);
