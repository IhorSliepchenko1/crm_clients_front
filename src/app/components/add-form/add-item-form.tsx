import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useAddCityMutation, useLazyGetAllCityQuery } from "../../services/cityApi";
import { useAddTypeNumberMutation, useLazyGetAllTypeNumberQuery } from "../../services/typeNumberApi";
import { TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";
import { useMemo } from "react";

type Data = { name: string }
type Props = { nameAdd: "city" | "type" }

export const AddItemForm: React.FC<Props> = ({ nameAdd }) => {
     const regex = /\d/;
     const { decoded } = useCheckValidToken()
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "" },
          validate: {
               name: (value) => (!value ?
                    "Обязательное поле!"
                    : nameAdd === "city" && regex.test(value) ?
                         "В названии города цифры не допускаются" : null),
          },
     });

     const [addCity, { isLoading: loadCity }] = useAddCityMutation()
     const [addTypeNumber, { isLoading: loadTypeNumber }] = useAddTypeNumberMutation()

     const [triggerAllCityQuery] = useLazyGetAllCityQuery()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()
     const { succeed, error } = useNotification()

     const actions = useMemo(() => ({
          add: nameAdd === "city" ? addCity : addTypeNumber,
          refresh: nameAdd === "city" ? triggerAllCityQuery : triggerAllTypeNumberQuery,
          textSucceed: nameAdd === "city" ? "город" : "тип базы",
     }), [nameAdd, addCity, addTypeNumber, triggerAllCityQuery, triggerAllTypeNumberQuery]);

     const onSubmit = async (data: Data) => {
          try {
               await actions.add(data).unwrap();
               succeed(`Новый ${actions.textSucceed} добавлен!`);
               form.reset()
               await actions.refresh().unwrap();

          } catch (err: any) {
               console.error(err);
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
          }
     }

     const upperCaseFirstLetter = (str: string) => {
          return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
     }

     return (
          decoded.role === ROLES.ADMIN &&
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label={upperCaseFirstLetter(actions.textSucceed)}
                    placeholder={"Введите название"}
                    key={form.key("name")}
                    {...form.getInputProps("name")}
               />
               <ButtonSubmit loading={nameAdd === "city" ? loadCity : loadTypeNumber} text={"Добавить"} />
          </form>
     )
}
