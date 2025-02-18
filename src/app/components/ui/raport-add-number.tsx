import { Button, Divider, NumberFormatter } from "@mantine/core"
import { Raport } from "../../types"
import { useRef } from "react";
import { useDownloadPDF } from "../../hooks/useDownloadPDF";
import { ContainerPDFimportNumbers } from "../layout/container-pdf-import-numbers";

type Props = {
     setRaport: React.Dispatch<React.SetStateAction<Raport | null>>
     raport: Raport
};

export const RaportAddNumber: React.FC<Props> = ({ raport, setRaport }) => {
     const pdfRef = useRef<HTMLDivElement>(null)

     const { downloadPDF } = useDownloadPDF({
          pdfRef,
          fileName: "raport"
     })

     const handleDownload = () => downloadPDF();
     const handleClose = () => setRaport(null);

     const buttons = [
          { color: "green", text: "скачать PDF", onClick: handleDownload },
          { color: "red", text: "закрыть", onClick: handleClose },
     ]

     const totalInfo = [
          { text: "К-во некорректных номеров", value: raport.incorrect },
          { text: "К-во уникальных номеров", value: raport.unique },
          { text: "К-во дублей", value: raport.totalDublicate },
     ]

     return (
          <div>
               <div className="flex justify-between my-5">
                    {buttons.map((item, index) => (
                         <Button key={index} variant="outline" color={item.color} size="xs" radius="xs" onClick={item.onClick}>{item.text}</Button>
                    ))}
               </div>
               <ContainerPDFimportNumbers ref={pdfRef}>
                    <div>
                         <div className="flex justify-between font-bold">
                              <p>Категория</p>
                              <p>К-во дублей</p>
                         </div>
                         <Divider my="xs" />
                         <div >
                              {raport.dublicate.map(item => (
                                   <div key={item.name + item.count} className="flex justify-between pb-0.5">
                                        <p className="pr-7">{item.name}</p>
                                        <NumberFormatter thousandSeparator="." decimalSeparator="," value={item.count} />
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="flex flex-col gap-2 font-bold">
                         {totalInfo.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                   <p>{item.text}</p>
                                   <NumberFormatter thousandSeparator="." decimalSeparator="," value={item.value} />
                              </div>
                         ))}
                    </div>
               </ContainerPDFimportNumbers>
          </div>
     )
}
