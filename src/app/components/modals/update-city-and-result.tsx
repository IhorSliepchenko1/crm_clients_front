import { Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useLazyGetAllCityQuery,
  useUpdateCityMutation,
} from "../../services/cityApi";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { useEffect, useMemo } from "react";
import { ModalActionComponent } from "../ui/modal-action-component";
import {
  useLazyGetAllResultQuery,
  useUpdateResultMutation,
} from "../../services/resultApi";
import { errorMessages } from "../../../utils/has-error-field";

type SubmitData = { name: string };

type Props = {
  nameItem: "city" | "result";
  id: number;
  opened: boolean;
  close: () => void;
  name: string;
  typeModal: "delete" | "update";
};

export const UpdateCityAndResultModal: React.FC<Props> = ({
  nameItem,
  id,
  opened,
  close,
  name,
  typeModal,
}) => {
  const regex = /\d/;

  const form = useForm<SubmitData>({
    mode: "uncontrolled",
    initialValues: { name },
    validate: {
      name: (value) =>
        !value
          ? "Обязательное поле!"
          : nameItem === "city" && regex.test(value)
          ? "В названии города цифры не допускаются"
          : null,
    },
  });

  const [updateCity, { isLoading: loadCity }] = useUpdateCityMutation();
  const [updateResultMutation, { isLoading: loadResult }] =
    useUpdateResultMutation();

  const [triggerAllCityQuery] = useLazyGetAllCityQuery();
  const [triggerAllResultQuery] = useLazyGetAllResultQuery();

  const { succeed, error } = useNotification();

  useEffect(() => {
    if (opened) {
      form.setValues({
        name,
      });
      form.resetDirty();
    }
  }, [opened]);

  const actions = useMemo(
    () => ({
      update: nameItem === "city" ? updateCity : updateResultMutation,
      refresh:
        nameItem === "city" ? triggerAllCityQuery : triggerAllResultQuery,
      loading: nameItem === "city" ? loadCity : loadResult,
      text: nameItem === "city" ? "Город" : "Результат",
    }),
    [nameItem]
  );

  const updateItem = async (data: SubmitData) => {
    try {
      await actions.update({ data, id }).unwrap();
      succeed(`${actions.text} '${name}' обновлён!`);
      form.reset();
      close();
      await actions.refresh().unwrap();
    } catch (err) {
      error(errorMessages(err));
    }
  };

  return (
    typeModal === "update" && (
      <Modal
        opened={opened}
        onClose={close}
        title="Обновление информации названия свойства"
      >
        <form onSubmit={form.onSubmit(updateItem)}>
          <TextInput
            label={actions.text}
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <ModalActionComponent
            disabled={!form.isDirty()}
            loading={actions.loading}
            close={close}
          />
        </form>
      </Modal>
    )
  );
};
