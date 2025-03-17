import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Props = {
     pdfRef: React.RefObject<HTMLDivElement | HTMLTableElement | null>,
     width?: number,
     margin_x_y?: number
     orientation?: "landscape" | "portrait"
     fileName: string
     scale?: number
}

export const useDownloadPDF = (
     {
          pdfRef,
          width = 200,
          margin_x_y = 0.25,
          orientation = "landscape",
          fileName,
          scale = 1.5
     }: Props) => {

     const downloadPDF = async () => {
          if (!pdfRef.current) return;
          // передаём ref еллементов  и объект scale для улучшения качества
          const canvas = await html2canvas(pdfRef.current, { scale }); // Генерация canvas          
          const imgData = canvas.toDataURL("image/jpg"); // Преобразование в PNG
          console.log(canvas.height, canvas.width);

          const pdfWidth = width;
          const maxHeight = 297; // A4 высота
          const pdfHeight = Math.min((canvas.height * pdfWidth) / canvas.width, maxHeight);
          const margin = margin_x_y

          const pdf = new jsPDF({
               orientation,
               unit: "mm",
               format: [pdfWidth + margin * 2, pdfHeight + margin * 2]
          });

          // изображение, формат изо, 2 маржина (X, Y), ширина, высота изо
          pdf.addImage(imgData, "JPG", margin, margin, pdfWidth, pdfHeight);
          pdf.save(`${fileName}.pdf`);
     }


     return { downloadPDF }
};