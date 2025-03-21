import { useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';
import { useAddResultHistoriesMutation } from '../../../services/resultHistoriesApi';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useFileValidation } from '../../../hooks/useFileValidation';
import { errorMessages } from '../../../../utils/has-error-field';
import { FileInput } from '@mantine/core';
import { DontLeave } from '../../ui/dont-leave';
import { ButtonSubmit } from '../../button/button-submit';
import { DownloadExampleCSV } from '../../ui/download-example-csv';
import { useAddGuestMutation } from '../../../services/guestApi';
import { useAutoDownloadFile } from '../../../hooks/useAutoDownloadFile';
import { BASE_URL } from '../../../../constants';

type Props = {
     type: "result" | "guest"
}

export const AddResultAndGuest: React.FC<Props> = ({ type }) => {
     const form = useForm({
          mode: "uncontrolled",
          initialValues: { data: null as File | null },
          validate: { data: (value: any) => (!value ? "Обязательное поле!" : null) },
     })

     const [value, setValue] = useState<File | null>(null);
     const [fileName, setFileName] = useState('')
     const [addFileResult, { isLoading: isLoadingResult }] = useAddResultHistoriesMutation()
     const [addFileGuest, { isLoading: isLoadingGuest }] = useAddGuestMutation()

     const { succeed, error } = useNotification()

     const actions = useMemo(() => (
          {
               add: type === "result" ? addFileResult : addFileGuest,
               loading: type === "result" ? isLoadingResult : isLoadingGuest
          }
     ), [type, isLoadingResult, isLoadingGuest])

     const headerCheck = useMemo(() =>
          type === "result"
               ? ["number", "full_name", "result", "dob", "call_date", "presentation_date", "presentation_time", "operator", "note"]
               : ["number", "date", "time", "full_name", "guests", "pairs", "dob"]
          , [type])

     const validateFile = useFileValidation();

     const onSubmit = async () => {
          try {
               if (value) {
                    await validateFile({
                         file: value,
                         headerCheck
                    });
                    const data = new FormData();
                    data.append("data", value);
                    const response = await actions.add({ data }).unwrap();
                    succeed(response.message);
                    setValue(null)
                    setFileName(response.fileNameErrorNumbers)
                    form.reset()
               }

          } catch (err) {
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
               <ButtonSubmit loading={actions.loading} text="Добавить" />

               {/* {raport && <RaportAddResultHistories raport={raport} setRaport={setRaport} />} */}
          </form>
     )
}
