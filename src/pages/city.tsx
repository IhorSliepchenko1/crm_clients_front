import { AddItemForm } from "../app/components/add-form/add-item-form"
import { Divider } from "@mantine/core"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { ItemComponent } from "../app/components/features/item/item-component"
import { useCheckValidToken } from "../app/hooks/useCheckValidToken"

export const City = () => {
  const { data, isLoading } = useGetAllCityQuery()
  const { decoded } = useCheckValidToken()

  return (
    <>
      {decoded.role === "ADMIN" && <AddItemForm nameAdd="city" />}
      <Divider my="sm" />
      <p className="text-center text-xl">Список городов</p>
      <ItemComponent
        nameItem="city"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
