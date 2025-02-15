import { Button, Divider, NumberFormatter } from "@mantine/core"
import { Raport } from "../../types"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface Props extends Raport {
     setRaportData: React.Dispatch<React.SetStateAction<Raport | null>>
}

export const RaportItem: React.FC<Props> = ({ incorrect, unique, dublicate, totalDublicate, setRaportData }) => {
     const pdfRef = useRef<HTMLDivElement>(null);

     const downloadPDF = async () => {
          if (!pdfRef.current) return;

          const canvas = await html2canvas(pdfRef.current, { scale: 2 });
          const imgData = canvas.toDataURL("image/png");

          const pdfWidth = 238.1;
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          const margin = 0.5;

          const pdf = new jsPDF({
               orientation: "landscape",
               unit: "mm",
               format: [pdfWidth + margin * 2, pdfHeight + margin * 2]
          });

          pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
          pdf.save("raport.pdf");
     };


     return (
          <div>
               <div className="flex justify-between my-5">
                    <Button variant="outline" color="green" size="xs" radius="xs" onClick={downloadPDF}>скачать PDF</Button>
                    <Button variant="outline" color="red" size="xs" radius="xs" onClick={() => setRaportData(null)}>закрыть</Button>
               </div>
               <div className="flex flex-col justify-between min-w-[70vw] border-2 border-dashed p-4 bg-white text-black h-full" ref={pdfRef}>
                    <div>
                         <div>
                              <div className="flex justify-between font-bold">
                                   <p>Категория</p>
                                   <p>К-во дублей</p>
                              </div>
                              <Divider my="xs" />
                              <div >
                                   {dublicate.map(item => (
                                        <div key={item.name + item.count} className="flex justify-between pb-0.5">
                                             <p className="pr-7">{item.name}</p>
                                             <NumberFormatter thousandSeparator="." decimalSeparator="," value={item.count} />
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>

                    <div className="flex flex-col gap-2 font-bold">
                         <div className="flex justify-between">
                              <p>К-во некорректных номеров</p>
                              <NumberFormatter thousandSeparator="." decimalSeparator="," value={incorrect} />
                         </div>
                         <div className="flex justify-between">
                              <p>К-во уникальных номеров</p>
                              <NumberFormatter thousandSeparator="." decimalSeparator="," value={unique} />
                         </div>
                         <div className="flex justify-between">
                              <p>Общее к-во дублей</p>
                              <NumberFormatter thousandSeparator="." decimalSeparator="," value={totalDublicate} />
                         </div>
                    </div>
               </div>
          </div>
     )
}
