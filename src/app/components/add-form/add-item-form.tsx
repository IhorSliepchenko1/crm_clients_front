import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useAddCityMutation, useLazyGetAllCityQuery } from "../../services/cityApi";
import { useAddTypeNumberMutation, useLazyGetAllTypeNumberQuery } from "../../services/typeNumberApi";
import { ColorInput, TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";
import { useMemo } from "react";

type Data = { name: string, color: string }
type Props = { nameAdd: "city" | "type" }

export const AddItemForm: React.FC<Props> = ({ nameAdd }) => {
     const regex = /\d/;
     const { decoded } = useCheckValidToken()
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "", color: "" },
          validate: {
               name: (value) => (!value ?
                    "Обязательное поле!"
                    : nameAdd === "city" && regex.test(value) ?
                         "В названии города цифры не допускаются" : null),
               color: (value) => (nameAdd === "type" && !value ?
                    "Обязательное поле!" : null),
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
          loading: nameAdd === "city" ? loadCity : loadTypeNumber,
          textSucceed: nameAdd === "city" ? "город" : "тип базы",
     }), [nameAdd]);


     const onSubmit = async (data: Data) => {
          try {

               const payload = nameAdd === "type"
                    ? { name: data.name, color: data.color }
                    : { name: data.name, color: "" };

               await actions.add(payload).unwrap();

               succeed(`Новый ${actions.textSucceed} добавлен!`);
               form.reset();
               await actions.refresh().unwrap();
          } catch (err: any) {
               console.error(err);
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
          }
     };


     const upperCaseFirstLetter = (str: string) => {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
     }

     return (
          decoded.role === ROLES.ADMIN &&
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label={upperCaseFirstLetter(actions.textSucceed)}
                    placeholder={"Введите название"}
                    {...form.getInputProps("name")}
               />
               {nameAdd === 'type' &&
                    <ColorInput
                         label={"Цвет для данного типа базы"}
                         placeholder={"Выберите цвет для данного типа"}
                         {...form.getInputProps("color")}
                    />
               }
               <ButtonSubmit loading={actions.loading} text={"Добавить"} />
          </form>
     )
}
