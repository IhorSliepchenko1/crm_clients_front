import { Divider } from "@mantine/core"
import { AddItemForm } from "../app/components/add-form/add-item-form"
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi"
import { ItemComponent } from "../app/components/features/item/item-component"
import { useCheckValidToken } from "../app/hooks/useCheckValidToken"

export const TypeNumber = () => {
  const { data, isLoading } = useGetAllTypeNumberQuery()
  const { decoded } = useCheckValidToken()

  return (
    <>
      {decoded.role === "ADMIN" && <AddItemForm nameAdd="type" />}
      <Divider my="sm" />
      <ItemComponent
        text="Список типов баз"
        nameItem="type"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
