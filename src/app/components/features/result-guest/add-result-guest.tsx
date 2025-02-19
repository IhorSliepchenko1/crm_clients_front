import { useForm } from '@mantine/form';
import { useMemo, useState } from 'react';
import { useAddResultHistoriesMutation } from '../../../services/resultHistoriesApi';
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useFileValidation } from '../../../hooks/useFileValidation';
import { hasErrorField } from '../../../../utils/has-error-field';
import { CSVLink } from 'react-csv';
import { FileInput } from '@mantine/core';
import { DontLeave } from '../../ui/dont-leave';
import { ButtonSubmit } from '../../button/button-submit';
import { RaportAddResultHistories } from '../../ui/raport-add-result-histories';
import { RaportImport } from '../../../types';

type Props = {
     type: "result" | "guest"
}

export const AddResultGuest: React.FC<Props> = ({ type }) => {
     const form = useForm({
          mode: "uncontrolled",
          initialValues: { data: null as File | null },
          validate: { data: (value) => (!value ? "Обязательное поле!" : null) },
     })

     const [value, setValue] = useState<File | null>(null);
     const [raport, setRaport] = useState<RaportImport | null>(null)

     const [addFileResult, { isLoading: isLoadingResult }] = useAddResultHistoriesMutation()
     const [addFileGuest, { isLoading: isLoadingGuest }] = useAddResultHistoriesMutation()

     const actions = type === "result" ? { add: addFileResult, loading: isLoadingResult } : { add: addFileGuest, loading: isLoadingGuest }

     const { succeed, error } = useNotification()

     const headerCheck = useMemo(() =>
          type === "result"
               ? ["number", "result", "presentation_date", "presentation_time", "call_date", "operator"]
               : ["number", "date", "time", "full_name", "guests", "pairs"]
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

                    succeed("Файл успешно импортирован");
                    setValue(null)
                    form.reset()
                    setRaport(response)
               }

          } catch (err: any) {
               console.error(err);
               setValue(null)
               form.reset()
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
          }
     }

     return (
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
               <ButtonSubmit loading={actions.loading} text="Добавить" />

               {raport && <RaportAddResultHistories raport={raport} setRaport={setRaport} />}
          </form>
     )
}
