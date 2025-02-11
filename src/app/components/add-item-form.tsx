import { useForm } from "@mantine/form";
import { useNotification } from "../hooks/useNotification/useNotification";
import { hasErrorField } from "../../utils/has-error-field";
import { useAddCityMutation, useLazyGetAllCityQuery } from "../services/cityApi";
import { useAddTypeNumberMutation, useLazyGetAllTypeNumberQuery } from "../services/typeNumberApi";
import { TextInput } from "@mantine/core";
import { ButtonSubmit } from "./button/button-submit";

type Data = { name: string }
type Props = { nameAdd: "city" | "type" }

export const AddItemForm: React.FC<Props> = ({ nameAdd }) => {
     const regex = /\d/;

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

     const actions = {
          city: { add: addCity, refresh: triggerAllCityQuery },
          type: { add: addTypeNumber, refresh: triggerAllTypeNumberQuery }
     };

     const onSubmit = async (data: Data) => {
          try {
               await actions[nameAdd].add(data).unwrap();
               succeed("Новое свойство добавлено!");
               form.reset()
               await actions[nameAdd].refresh().unwrap();

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error("Что-то пошло не так. Попробуйте снова.")
          }
     }

     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label={nameAdd === "city" ? "Город" : "Тип номера"}
                    placeholder={`Введите название ${nameAdd === "city" ? "города" : "типа номера"}`}
                    key={form.key("name")}
                    {...form.getInputProps("name")}
               />
               <ButtonSubmit loading={nameAdd === "city" ? loadCity : loadTypeNumber} text={"Добавить"} />
          </form>
     )
}
