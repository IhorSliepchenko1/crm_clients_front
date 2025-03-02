import { useExportFileMutation } from "../app/services/numberApi"
import { useForm } from "@mantine/form";
import { errorMessages } from "../utils/has-error-field";
import { useNotification } from "../app/hooks/useNotification/useNotification";
import { ParamlList } from "../app/types";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { Button, } from "@mantine/core";
import { FilterForm } from "../app/components/form/filter-form";

export const FilterDatabase = () => {
  const form = useForm({
    mode: 'uncontrolled',

    validate: {
      dob: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      blocking_period: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      update_count: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      first_call_date: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      last_call_date: (value) => (value && (value.split("-").length > 2 || value.split("-").length < 2) ? "Заполните как указано в примере!" : null),
      presentation_date: (value) => (value && (value.split(".").length > 3 || value.split(".").length < 3) ? "Заполните как указано в примере!" : null),
    },
  });

  const [exportFile, { isLoading }] = useExportFileMutation()
  const { succeed, error } = useNotification()
  const [fileName, setFileName] = useState('')

  const onSubmit = async (params: ParamlList) => {
    try {
      const response = await exportFile({ params }).unwrap();
      setFileName(response)
      succeed("Файл успешно импортирован");
      form.reset()

    } catch (err) {
      form.reset()
      error(errorMessages(err));
    }
  }

  const autoDownloadFile = () => {
    const link = document.createElement(`a`);
    link.setAttribute(`href`, `${BASE_URL}/${fileName}`);
    link.setAttribute(`download`, `${fileName}`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return
  }

  useEffect(() => {
    if (fileName) {
      autoDownloadFile()
    }
    setFileName('')
  }, [fileName])

  const cleanForm = () => form.reset()


  return (
    <div>
      <div className="flex justify-end">
        <Button variant="filled" color="gray" size="xs" radius="md" onClick={cleanForm}>очистить</Button>
      </div>
      <FilterForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}