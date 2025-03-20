import { useEffect, useState } from 'react';
import { FileInput } from '@mantine/core';
import { useAddNumberMutation } from '../../../services/numberApi';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { errorMessages } from '../../../../utils/has-error-field';
import { ButtonSubmit } from '../../button/button-submit';
import { useForm } from '@mantine/form';
import { NumberAdd } from '../../../types';
import { RaportAddNumber } from '../../ui/raport-add-number';
import { DontLeave } from '../../ui/dont-leave';
import { useFileValidation } from '../../../hooks/useFileValidation';
import { DownloadExampleCSV } from '../../ui/download-example-csv';
import { useAutoDownloadFile } from '../../../hooks/useAutoDownloadFile';
import { BASE_URL } from '../../../../constants';

export const AddNumbers = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { data: null as File | null },
    validate: {
      data: (value: any) => (!value ? "Обязательное поле!" : null),
    },
  })

  const [value, setValue] = useState<File | null>(null);
  const [raport, setRaport] = useState<NumberAdd | null>(null)
  const [fileName, setFileName] = useState('')

  const [addFile, { isLoading }] = useAddNumberMutation()
  const { succeed, error } = useNotification()
  const headerCheck = ["number", "typeNumber", "city", "full_name", "dob"]

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
        setFileName(response.fileNameErrorNumbers)
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
    <div >
      <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
        <DownloadExampleCSV array={headerCheck} />

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
        <ButtonSubmit loading={isLoading} text="Добавить" />
      </form>

      <div className='flex justify-center'>
        {raport && <RaportAddNumber
          raport={raport}
          setRaport={setRaport}
        />}
      </div>
    </div>
  )
}
