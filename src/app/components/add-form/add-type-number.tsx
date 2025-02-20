import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useAddTypeNumberMutation, useLazyGetAllTypeNumberQuery } from "../../services/typeNumberApi";
import { ColorInput, TextInput } from "@mantine/core";
import { ButtonSubmit } from "../button/button-submit";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { ROLES } from "../../../utils/role-list";

type Data = { name: string, color: string }

export const AddTypeNumberForm = () => {
     const { decoded } = useCheckValidToken()
     const form = useForm<Data>({
          mode: "uncontrolled",
          initialValues: { name: "", color: "" },
          validate: {
               name: (value) => (!value ? "Обязательное поле!" : null),
               color: (value) => (!value ? "Обязательное поле!" : null),
          },
     });

     const [addTypeNumber, { isLoading }] = useAddTypeNumberMutation()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()
     const { succeed, error } = useNotification()


     const onSubmit = async (data: Data) => {
          try {
               await addTypeNumber(data).unwrap();
               succeed(`Новый тип базы добавлен!`);
               form.reset();
               await triggerAllTypeNumberQuery().unwrap();

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
                    key={form.key("name")}
                    label="Тип базы"
                    placeholder={"Введите название"}
                    {...form.getInputProps("name")}
               />
               <ColorInput
                    key={form.key("color")}
                    label={"Цвет для данного типа базы"}
                    placeholder={"Выберите цвет для данного типа"}
                    {...form.getInputProps("color")}
               />
               <ButtonSubmit loading={isLoading} text={"Добавить"} />
          </form>
     )
}
