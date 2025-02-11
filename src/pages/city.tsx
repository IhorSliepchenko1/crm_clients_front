import { AddItemForm } from "../app/components/add-form/add-item-form"
import { Divider } from "@mantine/core"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { ItemComponent } from "../app/components/features/user/item-component"

export const City = () => {
  const { data, isLoading } = useGetAllCityQuery()

  return (
    <>
      <AddItemForm nameAdd="city" />
      <Divider my="sm" />
      <ItemComponent
        nameItem="city"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
