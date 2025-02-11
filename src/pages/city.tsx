import { AddItemForm } from "../app/components/add-item-form"
import { ItemComponent } from "../app/components/item-component"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { Divider } from "@mantine/core"

export const City = () => {
  const { data, isLoading } = useGetAllCityQuery()

  return (
    <>
      <AddItemForm nameAdd={"city"} />
      <Divider my="sm" />
      <ItemComponent
        nameItem="city"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
