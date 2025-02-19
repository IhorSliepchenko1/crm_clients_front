import { Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useLazyGetAllCityQuery, useUpdateCityMutation } from "../../services/cityApi";
import { useLazyGetAllTypeNumberQuery, useUpdateTypeNumberMutation } from "../../services/typeNumberApi";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useEffect } from "react";
import { ModalActionComponent } from "../ui/modal-action-component";
import { useLazyGetAllResultQuery, useUpdateResultMutation } from "../../services/resultApi";

type SubmitData = { name: string }

type Props = {
     nameItem: "city" | "type" | "result"
     id: number
     opened: boolean
     close: () => void
     name: string
     typeModal: "delete" | "update"
}

export const UpdateItemModal: React.FC<Props> = ({ nameItem, id, opened, close, name, typeModal }) => {
     const regex = /\d/;

     const form = useForm<SubmitData>({
          mode: "uncontrolled",
          initialValues: { name },
          validate: {
               name: (value) => (!value ?
                    "Обязательное поле!"
                    : nameItem === "city" && regex.test(value) ?
                         "В названии города цифры не допускаются" : null),
          },
     });

     const [updateCity, { isLoading: loadCity }] = useUpdateCityMutation()
     const [updateTypeNumber, { isLoading: loadTypeNumber }] = useUpdateTypeNumberMutation()
     const [updateResultMutation, { isLoading: loadResult }] = useUpdateResultMutation()

     const [triggerAllCityQuery] = useLazyGetAllCityQuery()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()
     const [triggerAllResultQuery] = useLazyGetAllResultQuery()

     const { succeed, error } = useNotification()

     useEffect(() => {
          if (opened) {
               form.setValues({
                    name,
               });
               form.resetDirty();
          }
     }, [opened]);

     const actions = {
          city: { update: updateCity, refresh: triggerAllCityQuery, loading: loadCity, text: "Город" },
          type: { update: updateTypeNumber, refresh: triggerAllTypeNumberQuery, loading: loadTypeNumber, text: "Тип базы" },
          result: { update: updateResultMutation, refresh: triggerAllResultQuery, loading: loadResult, text: "Результат" }
     };

     const updateItem = async ({ name }: SubmitData) => {
          try {
               await actions[nameItem].update({ id, name }).unwrap();
               succeed(`${actions[nameItem].text} '${name}' обновлён!`)
               form.reset();
               close()
               await actions[nameItem].refresh().unwrap();

          } catch (err: any) {
               console.error(err);
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
          }
     }

     return (
          typeModal === "update" && <Modal opened={opened} onClose={close} title="Обновление информации названия свойства">
               <form onSubmit={form.onSubmit(updateItem)}>
                    <TextInput
                         label={actions[nameItem].text}
                         {...form.getInputProps("name")}
                    />
                    <ModalActionComponent
                         disabled={!form.isDirty()}
                         loading={actions[nameItem].loading}
                         close={close}
                    />
               </form>
          </Modal>
     )
}
