import { Divider } from "@mantine/core"
import { AddResultForm } from "../app/components/add-form/add-result-form"
import { ItemComponent } from "../app/components/features/item/item-component"
import { useGetAllResultQuery } from "../app/services/resultApi"

export const Result = () => {
  const { data, isLoading } = useGetAllResultQuery()

  return (
    <>
      <AddResultForm data={data} dataLoading={isLoading} />
      <Divider my="sm" />
      <ItemComponent
        text="Список результатов"
        nameItem="result"
        data={data}
        isLoading={isLoading}
      />
    </>
  )
}
