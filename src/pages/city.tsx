import { AddItemsComponent } from "../app/components/add-items-component"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { ItemComponent } from "../app/components/item-component"
import { Divider } from "@mantine/core"
import { LoaderComponent } from "../app/components/loader"


export const City = () => {
  const { data, isLoading } = useGetAllCityQuery()

  return (
    <div className="flex flex-col">
      <AddItemsComponent nameAdd={"city"} />
      <Divider my="sm" />
      <div className="flex flex-col gap-3">
        {
          isLoading
            ? <LoaderComponent styles="h-[50vh]" />
            : data?.rows.map((item, index) => (
              <ItemComponent
                nameDelete="city"
                id={item.id}
                index={index + 1}
                name={item.name}
              />
            ))
        }
      </div>
    </div>)
}
