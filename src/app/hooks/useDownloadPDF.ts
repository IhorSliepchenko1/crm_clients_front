import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Props = {
  pdfRef: React.RefObject<HTMLDivElement | HTMLTableElement | null>;
  margin_x_y?: number; // отступы в мм
  orientation?: "landscape" | "portrait" | "l";
  fileName: string;
  scale?: number;
};

export const useDownloadPDF = ({
  pdfRef,
  margin_x_y = 10,
  orientation = "portrait",
  fileName,
  scale = 2,
}: Props) => {
  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    // Рендер с масштабом
    const canvas = await html2canvas(pdfRef.current, {
      scale,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });

    // Возвращаем позицию
    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF({
      orientation,
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const availableWidth = pageWidth - margin_x_y * 2;
    const availableHeight = pageHeight - margin_x_y * 2;

    const ratio = Math.min(
      availableWidth / canvas.width,
      availableHeight / canvas.height
    );

    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
  };

  return { downloadPDF };
};
