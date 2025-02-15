import { useState } from 'react';
import { FileInput } from '@mantine/core';
import { useAddNumberMutation } from '../app/services/numberApi';
import { useNotification } from '../app/hooks/useNotification/useNotification';
import { hasErrorField } from '../utils/has-error-field';
import { ButtonSubmit } from '../app/components/button/button-submit';
import { useForm } from '@mantine/form';
import { CSVLink } from 'react-csv';
import { Raport } from '../app/types';
import { RaportItem } from '../app/components/ui/raport-item';
import { useReadFile } from '../app/hooks/useReadFile';


export const AddNumbers = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { data: null as File | null },
    validate: {
      data: (value) => (!value ? "Обязательное поле!" : null),
    },
  })

  const [value, setValue] = useState<File | null>(null);
  const [raportData, setRaportData] = useState<Raport | null>(null)

  const [addFile, { isLoading }] = useAddNumberMutation()
  const { succeed, error } = useNotification()
  const headerCheck = ["number", "typeNumber", "city"]

  const validateFile = async (file: File) => {

    if (file.type !== "text/csv") {
      throw new Error("Данный формат не поддерживается!");
    }

    if (file.size > 5000000) {
      throw new Error("Максимальный объём файла 5мб");
    }

    const fileData = await useReadFile(file);
    const headerFile = fileData.split('\n')[0].replace("\r", '').split(";");

    if (!headerCheck.every(header => headerFile.includes(header))) {
      throw new Error("Некорректный файл!");
    }
  };

  const onSubmit = async () => {
    try {
      if (value) {
        await validateFile(value);

        const data = new FormData();
        data.append("data", value);
        const response = await addFile({ data }).unwrap();
        setRaportData(response)

        setValue(null)
        form.reset()
        succeed("Файл успешно отправлен");
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
        <p className='text-xs'>не покидайте страницу до окончания импорта</p>
        <ButtonSubmit loading={isLoading} text="Добавить" />
      </form>

      <div className='flex justify-center'>
        {raportData && <RaportItem
          dublicate={raportData.dublicate}
          incorrect={raportData.incorrect}
          unique={raportData.unique}
          totalDublicate={raportData.totalDublicate}
          setRaportData={setRaportData}
        />}
      </div>
    </div>
  )
}
