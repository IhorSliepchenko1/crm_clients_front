import { ColorInput, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useLazyGetAllTypeNumberQuery, useUpdateTypeNumberMutation } from "../../services/typeNumberApi";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { hasErrorField } from "../../../utils/has-error-field";
import { useEffect } from "react";
import { ModalActionComponent } from "../ui/modal-action-component";

type SubmitData = { name?: string, color?: string }

type Props = {
     id: number
     opened: boolean
     close: () => void
     name: string
     typeModal: "delete" | "update"
     color: string
}

export const UpdateTypeNumberModal: React.FC<Props> = ({ id, opened, close, name, typeModal, color = '' }) => {

     const form = useForm<SubmitData>({
          mode: "uncontrolled",
          initialValues: { name, color }
     });

     const [updateTypeNumber, { isLoading }] = useUpdateTypeNumberMutation()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()
     const { succeed, error } = useNotification()

     useEffect(() => {
          if (opened) {
               form.setValues({
                    name, color
               });
               form.resetDirty();
          }
     }, [opened]);



     const updateItem = async (data: SubmitData) => {
          try {
               await updateTypeNumber({ data, id }).unwrap();
               succeed(`Тип базы '${name}' обновлён!`)
               form.reset();
               close()
               await triggerAllTypeNumberQuery().unwrap();

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
                         label="Тип базы"
                         {...form.getInputProps("name")}
                    />

                    <ColorInput
                         label={"Цвет для данного типа базы"}
                         placeholder={"Выберите цвет для данного типа"}
                         key={form.key("color")}
                         {...form.getInputProps("color")}
                    />
                    <ModalActionComponent
                         disabled={!form.isDirty()}
                         loading={isLoading}
                         close={close}
                    />
               </form>
          </Modal>
     )
}
