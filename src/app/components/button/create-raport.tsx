import { useForm } from "@mantine/form"
import { errorMessages } from "../../../utils/has-error-field"
import { useNotification } from "../../hooks/useNotification/useNotification"
import { useCreateRaportMutation, useLazyGetRaportQuery } from "../../services/numberApi"
import { ButtonSubmit } from "./button-submit"

type Props = { city: string }

export const CreateRaport: React.FC<Props> = ({ city }) => {
     const [createRaport, { isLoading }] = useCreateRaportMutation()
     const [triggerUpdateRaportHistories] = useLazyGetRaportQuery()
     const { succeed, error } = useNotification()
     const form = useForm();

     const onSubmit = async () => {
          try {
               const response = await createRaport({}).unwrap();
               await triggerUpdateRaportHistories({ city }).unwrap();
               succeed(response)
          } catch (err) {
               error(errorMessages(err));
          }
     }
     return (
          <form onSubmit={form.onSubmit(onSubmit)}>
               {<ButtonSubmit loading={isLoading} text={"Принудительно обновить рапорт"} />}
          </form>
     )
}
