import { Divider } from "@mantine/core"
import { AddItemsComponent } from "../app/components/add-items-component"
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi"
import { LoaderComponent } from "../app/components/loader"
import { ItemComponent } from "../app/components/item-component"

export const TypeNumber = () => {
  const { data, isLoading } = useGetAllTypeNumberQuery()

  return (
    <div>
      <AddItemsComponent nameAdd={"type"} />
      <Divider my="xs" />
      <div className="flex flex-col gap-3">
        {
          isLoading
            ? <LoaderComponent styles="h-[50vh]" />
            : data?.rows.map((item, index) => (
              <ItemComponent
                nameDelete="type"
                id={item.id}
                index={index + 1}
                name={item.name}
              />
            ))
        }
      </div>
    </div>
  )
}
