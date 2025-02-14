import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useAddCityMutation, useLazyGetAllCityQuery } from "../../services/cityApi";
import { useAddTypeNumberMutation, useLazyGetAllTypeNumberQuery } from "../../services/typeNumberApi";
import { TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";

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

     const actions = nameAdd === "city" ?
          { add: addCity, refresh: triggerAllCityQuery, textSucceed: "город" } :
          { add: addTypeNumber, refresh: triggerAllTypeNumberQuery, textSucceed: "тип базы" }

     const onSubmit = async (data: Data) => {
          try {
               await actions.add(data).unwrap();
               succeed(`Новый ${actions.textSucceed} добавлен!`);
               form.reset()
               await actions.refresh().unwrap();

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error("Что-то пошло не так. Попробуйте снова.")
          }
     }

     return (
          decoded.role === ROLES.ADMIN &&
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
