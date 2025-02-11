import { Divider } from "@mantine/core"
import { AddItem } from "../app/components/add-item"
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi"
import { LoaderComponent } from "../app/components/loader"
import { ItemComponent } from "../app/components/item-component"
import { ScrolContainer } from "../app/components/layout/scrol-container"

export const TypeNumber = () => {
  const { data, isLoading } = useGetAllTypeNumberQuery()

  return (
    <div>
      <AddItem nameAdd={"type"} />
      <Divider my="xs" />
      <ScrolContainer>
        <>
          {
            isLoading
              ? <LoaderComponent styles="h-[50vh]" />
              : data?.rows.map((item, index) => (
                <ItemComponent
                  nameItem="type"
                  id={item.id}
                  index={index + 1}
                  name={item.name}
                />
              ))
          }
        </>
      </ScrolContainer>
    </div>
  )
}
