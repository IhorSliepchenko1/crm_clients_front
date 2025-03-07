import { useForm } from "@mantine/form";
import { useState } from "react";
import { useUpdateNumberFileMutation } from "../../../services/numberApi";
import { useNotification } from "../../../hooks/useNotification/useNotification";
import { useFileValidation } from "../../../hooks/useFileValidation";
import { errorMessages } from "../../../../utils/has-error-field";
import { DownloadExampleCSV } from "../../ui/download-example-csv";
import { FileInput } from "@mantine/core";
import { DontLeave } from "../../ui/dont-leave";
import { ButtonSubmit } from "../../button/button-submit";
import { TRaportUpdateNumberFile } from "../../../types";
import { RaportUpdateNumberFile } from "../../ui/raport-update-number-file";

export const UpdateNumberFile = () => {
     const form = useForm({
          mode: "uncontrolled",
          initialValues: { data: null as File | null },
          validate: {
               data: (value) => (!value ? "Обязательное поле!" : null),
          },
     })

     const [value, setValue] = useState<File | null>(null);
     const [raport, setRaport] = useState<TRaportUpdateNumberFile | null>(null)

     const [update, { isLoading }] = useUpdateNumberFileMutation()
     const { succeed, error } = useNotification()
     const headerCheck = ["number", "blocking_status"]

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
                    const response = await update({ data }).unwrap();
                    succeed("Файл успешно импортирован");
                    setRaport(response)
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
               <ButtonSubmit loading={isLoading} text="Отправить файл" />

               <div className='flex justify-items-start mt-3'>
                    {raport && <RaportUpdateNumberFile raport={raport} setRaport={setRaport} />}
               </div>
          </form>
     )
}
