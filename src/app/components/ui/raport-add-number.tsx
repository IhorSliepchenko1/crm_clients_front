import { Button, Divider, NumberFormatter } from "@mantine/core"
import { useEffect, useMemo, useRef } from "react";
import { useDownloadPDF } from "../../hooks/useDownloadPDF";
import { ContainerPDFimportNumbers } from "../layout/container-pdf-import-numbers";
import { NumberAdd } from "../../types";

type Props = {
     setRaport: React.Dispatch<React.SetStateAction<NumberAdd | null>>
     raport: NumberAdd
};
export const RaportAddNumber: React.FC<Props> = ({ raport, setRaport }) => {
     const pdfRef = useRef<HTMLDivElement>(null)

     const { downloadPDF } = useDownloadPDF({
          pdfRef,
          fileName: "raport",
          orientation: 'landscape'
     })
     const handleDownload = () => downloadPDF();
     ;
     const handleClose = () => setRaport(null);

     const buttons = [
          { color: "green", text: "скачать PDF", onClick: handleDownload },
          { color: "red", text: "закрыть", onClick: handleClose },
     ]

     const totalInfo = [
          { text: "К-во дублей в базе", value: raport.importHistory.duplicates_in_base },
          { text: "К-во дублей в файле", value: raport.importHistory.duplicates_in_file },
          { text: "К-во некорректных номеров", value: raport.importHistory.incorrect_numbers },
          { text: "К-во импортированных", value: raport.importHistory.unique_numbers },
     ]

     const filterNull = useMemo(() => {
          const filterData = raport.duplicatesByTypes.filter((item) => {
               return item.count > 0
          })

          return filterData
     }, [])

     return (
          <div>
               <div className="flex justify-between my-5">
                    {buttons.map((item, index) => (
                         <Button
                              key={index}
                              variant="outline"
                              color={item.color}
                              size="xs"
                              radius="xs"
                              onClick={item.onClick}>
                              {item.text}
                         </Button>
                    ))}
               </div>
               <ContainerPDFimportNumbers ref={pdfRef} >

                    <div>
                         <div className="flex justify-between font-bold">
                              <p>Категория</p>
                              <p>К-во дублей</p>
                         </div>
                         <Divider my="xs" />
                         <div >
                              {filterNull.map(item => (
                                   <div key={item.name + item.count} className="flex justify-between pb-0.5">
                                        <p className="pr-7">{item.name}</p>

                                        <NumberFormatter
                                             thousandSeparator="."
                                             decimalSeparator=","
                                             value={item.count}
                                        />
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="flex flex-col gap-2 font-bold">
                         {totalInfo.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                   <p>{item.text}</p>

                                   <NumberFormatter
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        value={item.value}
                                   />
                              </div>
                         ))}
                    </div>
               </ContainerPDFimportNumbers>
          </div>
     )
}
