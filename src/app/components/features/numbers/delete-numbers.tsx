import { useState } from 'react';
import { FileInput } from '@mantine/core';
import { useDeleteNumberMutation } from '../../../services/numberApi';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { hasErrorField } from '../../../../utils/has-error-field';
import { ButtonSubmit } from '../../button/button-submit';
import { useForm } from '@mantine/form';
import { DontLeave } from '../../ui/dont-leave';

export const DeleteNumbers = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { data: null as File | null },
    validate: {
      data: (value) => (!value ? "Обязательное поле!" : null),
    },
  })
  const [value, setValue] = useState<File | null>(null);
  const [deleteFile, { isLoading }] = useDeleteNumberMutation()
  const { succeed, error } = useNotification()

  const validateFile = async (file: File) => {

    if (file.type !== "text/csv") {
      throw new Error("Данный формат не поддерживается!");
    }

    if (file.size > 5000000) {
      throw new Error("Максимальный объём файла 5мб");
    }
  };

  const onSubmit = async () => {
    try {
      if (value) {
        await validateFile(value);
        const data = new FormData();
        data.append("data", value);
        await deleteFile({ data }).unwrap();
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
      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
        <p>Загрузите файл с номера для удаления</p>
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
        <ButtonSubmit loading={isLoading} text="Удалить" color="red" />
      </form>
    </div>

  )
}
