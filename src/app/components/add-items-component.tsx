import { useForm } from "@mantine/form";
import { useNotification } from "../hooks/useNotification";
import { hasErrorField } from "../../utils/has-error-field";
import { useAddCityMutation, useLazyGetAllCityQuery } from "../services/cityApi";
import { useAddTypeNumberMutation, useLazyGetAllTypeNumberQuery } from "../services/typeNumberApi";
import { Button, TextInput } from "@mantine/core";

type Data = { name: string }
type Props = { nameAdd: 'city' | 'type' }

export const AddItemsComponent: React.FC<Props> = ({ nameAdd }) => {
     const form = useForm<Data>({
          mode: 'uncontrolled',
          initialValues: { name: '' },
          validate: {
               name: (value) => (!value ? 'Обязательное поле!' : null),
          },
     });

     const [addCity, { isLoading: loadCity }] = useAddCityMutation()
     const [addTypeNumber, { isLoading: loadTypeNumber }] = useAddTypeNumberMutation()

     const [triggerAllCityQuery] = useLazyGetAllCityQuery()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()
     const { succeed, error } = useNotification()

     const actions = {
          city: { add: addCity, refresh: triggerAllCityQuery },
          type: { add: addTypeNumber, refresh: triggerAllTypeNumberQuery }
     };

     const onSubmit = async (data: Data) => {
          try {
               await actions[nameAdd].add(data).unwrap();
               succeed("Новое свойство добавлено!");
               form.reset()
               await actions[nameAdd].refresh().unwrap();

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error('Что-то пошло не так. Попробуйте снова.')
          }
     }
     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label={nameAdd === 'city' ? "Город" : "Тип номера"}
                    placeholder={`Введите название ${nameAdd === 'city' ? "города" : "типа номера"}`}
                    key={form.key('name')}
                    {...form.getInputProps('name')}
               />

               <Button type="submit" mt="sm" loading={nameAdd === 'city' ? loadCity : loadTypeNumber} loaderProps={{ type: 'dots' }}>
                    Добавить
               </Button>
          </form>
     )
}
