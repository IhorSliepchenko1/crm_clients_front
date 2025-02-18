import { Button } from "@mantine/core"
import { RaportImport } from "../../types"


type Props = {
     raport: RaportImport
     setRaport: React.Dispatch<React.SetStateAction<RaportImport | null>>
}
export const RaportAddResultHistories: React.FC<Props> = ({ raport, setRaport }) => {

     const clearRaport = () => setRaport(null)

     return (
          <div className="w-[200px] flex flex-col gap-2">
               <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                         <p>Импортированно: </p>
                         {raport.import}
                    </div>
                    <div className="flex justify-between">
                         <p>Некорректные номера: </p>
                         {raport.incorrect}
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
