import { TItem } from "../../../types"
import { Item } from "../item/item"
import { LoaderComponent } from "../../layout/loader"
import { ScrolContainer } from "../../layout/scrol-container"

type Props = {
     isLoading: boolean
     data: { rows: TItem[] } | undefined
     nameItem: "city" | "type" | "result"
     text: string
}

export const ItemComponent: React.FC<Props> = ({ isLoading, data, nameItem, text }) => {
     return (
          <ScrolContainer>
               <p className="text-center text-xl sticky top-0">{text}</p>
               {isLoading
                    ? <LoaderComponent styles="h-[50vh]" />
                    : data?.rows.map((item, index) => (
                         <Item
                              nameItem={nameItem}
                              key={item.id}
                              id={item.id}
                              index={index + 1}
                              name={item.name}
                              color={"color" in item && typeof item.color === 'string' ? item.color : ''}
                         />))}
          </ScrolContainer>
     )
}
