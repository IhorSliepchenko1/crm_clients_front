import { CSVLink } from "react-csv"
import { FaFileDownload } from "react-icons/fa"

export const DownloadExampleCSV: React.FC<{ array: string[] }> = ({ array }) => {

     return (
          <div className='flex items-center gap-1 my-2'>
               <CSVLink separator=";" data={[array]} filename="example.csv" className="flex items-center gap-1 hover:bg-cyan-900 transition-all">
                    <span>
                         Скачать пример файла
                    </span>
                    <span><FaFileDownload /></span>
               </CSVLink>
          </div>
     )
}
