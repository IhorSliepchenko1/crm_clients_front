import { CSVLink } from "react-csv"
import { FaFileDownload } from "react-icons/fa"

export const DownloadExampleCSV: React.FC<{ array: string[] }> = ({ array }) => {
     return (
          <div className='flex items-center gap-1 my-2'>
               <CSVLink data={[array]} filename="example.csv">
                    Скачать пример файла
               </CSVLink>
               <span><FaFileDownload /></span>
          </div>
     )
}
