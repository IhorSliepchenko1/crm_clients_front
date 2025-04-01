import { useEffect, useState } from 'react';
import { FileInput } from '@mantine/core';
import { useDeleteNumberMutation } from '../../../services/numberApi';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { errorMessages } from '../../../../utils/has-error-field';
import { ButtonSubmit } from '../../button/button-submit';
import { useForm } from '@mantine/form';
import { DontLeave } from '../../ui/dont-leave';
import { useFileValidation } from '../../../hooks/useFileValidation';
import { useAutoDownloadFile } from '../../../hooks/useAutoDownloadFile';
import { BASE_URL } from '../../../../constants';

export const DeleteNumbers = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { data: null as File | null },
    validate: {
      data: (value: any) => (!value ? "Обязательное поле!" : null),
    },
  })
  const [value, setValue] = useState<File | null>(null);
  const [fileName, setFileName] = useState('')
  const [deleteFile, { isLoading }] = useDeleteNumberMutation()
  const { succeed, error } = useNotification()

  const validateFile = useFileValidation();

  const onSubmit = async () => {
    try {
      if (value) {
        await validateFile({ file: value, });
        const data = new FormData();
        data.append("data", value);
        const { message } = await deleteFile({ data }).unwrap();
        succeed("Файл успешно импортирован");
        setFileName(message)
        setValue(null)
        form.reset()
      }

    }
    catch (err) {
      setValue(null)
      form.reset()
      error(errorMessages(err));
    }
  }

  const { autoDownloadFile } = useAutoDownloadFile()

  useEffect(() => {
    if (fileName) {
      autoDownloadFile(BASE_URL, fileName)
    }
    setFileName('')
  }, [fileName])

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
        <p>Загрузите файл с номерами для удаления</p>
        <FileInput
          placeholder="Загрузите файл формата .csv"
          key={form.key("data")}
          {...form.getInputProps("data")}
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
