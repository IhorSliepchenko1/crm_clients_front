import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ButtonSubmit } from "../../button/button-submit";
import { useFindNumberMutation } from "../../../services/numberApi";
import { FindInfoNumber, TFindNumber } from "../../../types";
import { useNotification } from "../../../hooks/useNotification/useNotification";
import { errorMessages } from "../../../../utils/has-error-field";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { NumberInfoModal } from "../../modals/number-info-modal";

type Props = {
     dataCity: string[] | undefined
     dataResult: string[] | undefined,
     dataTypeNumber: string[] | undefined
}

export const FindNumber: React.FC<Props> = ({ dataCity, dataResult, dataTypeNumber }) => {
     const regex = /[a-zA-Zа-яА-ЯёЁ]/;
     const form = useForm<{ number: string }>({
          mode: 'uncontrolled',
          validate: {
               number: (value) => !value ? "Обязательное поле!" : value.length < 9 || value.length > 9 ? "Номер должен состоять из 9 цифр!" : regex.test(value) ? "Номер должен состоять только из цифр!" : null,
          },
     });

     const [findNumber, { isLoading }] = useFindNumberMutation()
     const { succeed, error } = useNotification()
     const [numberInfo, setNumberInfo] = useState<FindInfoNumber | null>(null)
     const [opened, { open, close }] = useDisclosure(false);

     const onSubmit = async (number: TFindNumber) => {
          try {
               setNumberInfo(null)
               const response = await findNumber(number).unwrap();
               setNumberInfo(response)
               succeed("Номер найден");
               form.reset()
               open()

          } catch (err) {
               form.reset()
               error(errorMessages(err));
          }
     }

     return (
          <>
               <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5 my-10 px-5">
                    <TextInput
                         key={form.key("number")}
                         {...form.getInputProps("number")}
                         label="Введите номер для поиска в базе"
                         placeholder="123456789"
                    />
                    <ButtonSubmit loading={isLoading} text="Поиск" color="green" />
               </form>
               {numberInfo && <NumberInfoModal
                    opened={opened}
                    close={close}
                    numberInfo={numberInfo}
                    dataCity={dataCity}
                    dataTypeNumber={dataTypeNumber}
               />}
          </>
     )
}
