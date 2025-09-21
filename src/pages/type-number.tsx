import { Divider } from "@mantine/core";
import { useGetAllTypeNumberQuery } from "../app/services/typeNumberApi";
import { ItemComponent } from "../app/components/features/item/item-component";
import { AddTypeNumberForm } from "../app/components/form/add-type-number";

export const TypeNumber = () => {
  const { data, isLoading } = useGetAllTypeNumberQuery();

  return (
    <>
      <AddTypeNumberForm />
      <Divider my="sm" />
      <ItemComponent
        text="Список типов баз"
        nameItem="type"
        data={data}
        isLoading={isLoading}
      />
    </>
  );
};
