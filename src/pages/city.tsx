import { AddItem } from "../app/components/add-item"
import { useGetAllCityQuery } from "../app/services/cityApi"
import { ItemComponent } from "../app/components/item-component"
import { Divider } from "@mantine/core"
import { LoaderComponent } from "../app/components/layout/loader"
import { ScrolContainer } from "../app/components/layout/scrol-container"


export const City = () => {
  const { data, isLoading } = useGetAllCityQuery()

  return (
    <div className="flex flex-col">
      <AddItem nameAdd={"city"} />
      <Divider my="sm" />
      <ScrolContainer>
        <>
          {
            isLoading
              ? <LoaderComponent styles="h-[50vh]" />
              : data?.rows.map((item, index) => (
                <ItemComponent
                  nameItem="city"
                  key={item.id}
                  id={item.id}
                  index={index + 1}
                  name={item.name}
                />
              ))
          }
        </>
      </ScrolContainer>
    </div>)
}
