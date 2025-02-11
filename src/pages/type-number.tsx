import { Divider } from "@mantine/core"
import { AddItemForm } from "../app/components/add-item-form"
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi"
import { ItemComponent } from "../app/components/item-component"

export const TypeNumber = () => {
  const { data, isLoading } = useGetAllTypeNumberQuery()

  return (
    <>
      <AddItemForm nameAdd="type" />
      <Divider my="xs" />
      <ItemComponent
        nameItem="type"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
