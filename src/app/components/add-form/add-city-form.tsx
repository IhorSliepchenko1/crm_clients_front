import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useAddCityMutation, useLazyGetAllCityQuery } from "../../services/cityApi";
import { TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";

type Data = { name: string }

export const AddCityForm = () => {
     const regex = /\d/;
     const { decoded } = useCheckValidToken()
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "" },
          validate: {
               name: (value) => (!value ?
                    "Обязательное поле!"
                    : regex.test(value) ?
                         "В названии города цифры не допускаются" : null),
          },
     });

     const [addCity, { isLoading }] = useAddCityMutation()
     const [triggerAllCityQuery] = useLazyGetAllCityQuery()
     const { succeed, error } = useNotification()

     const onSubmit = async (data: Data) => {
          try {
               await addCity(data).unwrap();
               succeed(`Новый город добавлен!`);
               form.reset();
               await triggerAllCityQuery().unwrap();

          } catch (err: any) {
               console.error(err);
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
          }
     };

     return (
          decoded.role === ROLES.ADMIN &&
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    key={form.key('name')}
                    label="Город"
                    placeholder={"Введите название"}
                    {...form.getInputProps("name")}
               />

               <ButtonSubmit loading={isLoading} text={"Добавить"} />
          </form>
     )
}
