import { useForm } from "@mantine/form"
import { errorMessages } from "../../../utils/has-error-field"
import { useNotification } from "../../hooks/useNotification/useNotification"
import { useCreateRaportMutation } from "../../services/numberApi"
import { ButtonSubmit } from "./button-submit"

export const CreateRaport = () => {
     const [createRaport, { isLoading }] = useCreateRaportMutation()
     const { succeed, error } = useNotification()
     const form = useForm();

     const onSubmit = async () => {
          try {
               await createRaport({}).unwrap();
               succeed(`Рапорт обновлён!`)
          } catch (err) {
               error(errorMessages(err));
          }
     }
     return (
          <form onSubmit={form.onSubmit(onSubmit)}>
               {<ButtonSubmit loading={isLoading} text={"Принудительно обновить рапорт"} color={"green"} />}
          </form>
     )
}
