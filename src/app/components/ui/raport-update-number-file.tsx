import { Button } from "@mantine/core"
import { TRaportUpdateNumberFile } from "../../types"

type Props = {
     raport: TRaportUpdateNumberFile
     setRaport: React.Dispatch<React.SetStateAction<TRaportUpdateNumberFile | null>>
}

export const RaportUpdateNumberFile: React.FC<Props> = ({ raport, setRaport }) => {
     const clearRaport = () => setRaport(null)
     return (
          <div className="w-[200px] flex flex-col gap-2">
               <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                         <p>Изменено: </p>
                         {raport.changes}
                    </div>
                    <div className="flex justify-between">
                         <p>Не найдены: </p>
                         {raport.notFoundNumber}
                    </div>
               </div>
               <Button
                    onClick={clearRaport}
                    variant="outline"
                    color="gray"
                    size="xs"
                    radius="md"
               >Закрыть</Button>
          </div>
     )
}
