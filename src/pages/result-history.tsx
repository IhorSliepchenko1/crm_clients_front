import { hasErrorField } from "../utils/has-error-field";
import { useNotification } from "../app/hooks/useNotification/useNotification";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useAddResultHistoriesMutation } from "../app/services/resultHistoriesApi";
import { FileInput } from "@mantine/core";
import { ButtonSubmit } from "../app/components/button/button-submit";
import { DontLeave } from "../app/components/ui/dont-leave";
import { useFileValidation } from "../app/hooks/useFileValidation";


export const ResultHistory = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { data: null as File | null },
    validate: {
      data: (value) => (!value ? "Обязательное поле!" : null),
    },
  })
  const [value, setValue] = useState<File | null>(null);
  const [addFile, { isLoading }] = useAddResultHistoriesMutation()
  const { succeed, error } = useNotification()

  const validateFile = useFileValidation();

  const onSubmit = async () => {
    try {
      if (value) {
        validateFile(value);
        const data = new FormData();
        data.append("data", value);
        await addFile({ data }).unwrap();
        succeed("Файл успешно импортирован");
        setValue(null)
        form.reset()
      }

    } catch (err: any) {
      setValue(null)
      form.reset()
      const message = hasErrorField(err) ? err.data.message : err.message || "Что-то пошло не так. Попробуйте снова.";
      error(message);
    }
  }

  return (
    <div>
      {/* <div className='flex justify-between items-center py-3'>
        <p>Загрузите файл с номера для удаления</p>
        <Button leftSection={<FaLongArrowAltLeft />} variant="filled" size="xs" onClick={() => navigate('/add-numbers')}>добавить номера</Button>
      </div> */}
      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
        <FileInput
          key={form.key("data")}
          {...form.getInputProps("data")}
          placeholder="Загрузите файл формата .csv"
          value={value}
          onChange={(file) => {
            setValue(file)
            form.setFieldValue("data", file)
          }}
        />
        <DontLeave />
        <ButtonSubmit loading={isLoading} text="Добавить" />
      </form>
    </div>
  )
}
