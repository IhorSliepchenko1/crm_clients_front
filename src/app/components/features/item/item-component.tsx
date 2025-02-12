import { TItem } from "../../../types"
import { Item } from "../item/item"
import { LoaderComponent } from "../../layout/loader"
import { ScrolContainer } from "../../layout/scrol-container"

type Props = {
     isLoading: boolean
     data: {
          rows: TItem[];
     } | undefined
     nameItem: "city" | "type"
}

export const ItemComponent: React.FC<Props> = ({ isLoading, data, nameItem }) => {
     return (
          <ScrolContainer>
               {isLoading
                    ? <LoaderComponent styles="h-[50vh]" />
                    : data?.rows.map((item, index) => (
                         <Item
                              nameItem={nameItem}
                              key={item.id}
                              id={item.id}
                              index={index + 1}
                              name={item.name}
                         />))}
          </ScrolContainer>
     )
}
