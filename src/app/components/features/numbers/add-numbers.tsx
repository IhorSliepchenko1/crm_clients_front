import { useState } from 'react';
import { FileInput } from '@mantine/core';
import { useAddNumberMutation } from '../../../services/numberApi';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { hasErrorField } from '../../../../utils/has-error-field';
import { ButtonSubmit } from '../../button/button-submit';
import { useForm } from '@mantine/form';
import { CSVLink } from 'react-csv';
import { Raport } from '../../../types';
import { RaportAddNumber } from '../../ui/raport-add-number';
import { DontLeave } from '../../ui/dont-leave';
import { useFileValidation } from '../../../hooks/useFileValidation';

export const AddNumbers = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { data: null as File | null },
    validate: {
      data: (value) => (!value ? "Обязательное поле!" : null),
    },
  })

  const [value, setValue] = useState<File | null>(null);
  const [raport, setRaport] = useState<Raport | null>(null)

  const [addFile, { isLoading }] = useAddNumberMutation()
  const { succeed, error } = useNotification()
  const headerCheck = ["number", "typeNumber", "city"]

  const validateFile = useFileValidation();

  const onSubmit = async () => {
    try {
      if (value) {
        await validateFile({
          file: value,
          headerCheck,
          fileStatus: true
        });
        const data = new FormData();
        data.append("data", value);
        const response = await addFile({ data }).unwrap();
        succeed("Файл успешно импортирован");
        setRaport(response)
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
    <div >
      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
        <CSVLink data={[headerCheck]} filename="example.csv">
          Скачать пример файла
        </CSVLink>

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

      <div className='flex justify-center'>
        {raport && <RaportAddNumber raport={raport} setRaport={setRaport}
        />}
      </div>
    </div>
  )
}
