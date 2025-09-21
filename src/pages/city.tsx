import { AddCityForm } from "../app/components/form/add-city-form";
import { Divider } from "@mantine/core";
import { useGetAllCityQuery } from "../app/services/cityApi";
import { ItemComponent } from "../app/components/features/item/item-component";

export const City = () => {
  const { data, isLoading } = useGetAllCityQuery();

  return (
    <>
      <AddCityForm />
      <Divider my="sm" />
      <ItemComponent
        text="Список городов"
        nameItem="city"
        data={data}
        isLoading={isLoading}
      />
    </>
  );
};
