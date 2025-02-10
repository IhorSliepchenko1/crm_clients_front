import { Group } from '@mantine/core'
import { useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import { useDisclosure } from '@mantine/hooks';
import { useCheckValidToken } from '../hooks/useCheckValidToken';
import { useDeleteCityMutation, useLazyGetAllCityQuery } from '../services/cityApi';
import { useDeleteTypeNumberMutation, useLazyGetAllTypeNumberQuery } from '../services/typeNumberApi';
import { hasErrorField } from '../../utils/has-error-field';
import { ActionComponent } from './action-component';
import { DeleteModals } from './modals/delete-modals';

type Props = {
     nameDelete: "city" | "type"
     id: number
     index: number
     name: string
}

export const ItemComponent: React.FC<Props> = ({ nameDelete, id, index, name }) => {
     const [modal, setModal] = useState<0 | 1>(0)
     const [opened, { open, close }] = useDisclosure(false);
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const [deeleteCityMutation] = useDeleteCityMutation()
     const [triggerAllCityQuery] = useLazyGetAllCityQuery()

     const [deeleteTypeNumberMutation] = useDeleteTypeNumberMutation()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()

     const actions = {
          city: { delete: deeleteCityMutation, refresh: triggerAllCityQuery },
          type: { delete: deeleteTypeNumberMutation, refresh: triggerAllTypeNumberQuery }
     };

     const onDelete = async () => {
          try {
               await actions[nameDelete].delete(id).unwrap();
               succeed("Свойство удалено!")
               await actions[nameDelete].refresh().unwrap();
               close()

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error("Что-то пошло не так. Попробуйте снова.")
          }
     }

     const openUpdateModal = () => {
          setModal(1)
          open()
     }

     const openDeleteModal = () => {
          setModal(0)
          open()
     }

     return (
          <Group justify="space-between">
               <div className="flex gap-2">
                    <div>{index}.</div>
                    <div>{name}</div>
               </div>
               <ActionComponent id={decoded.id} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
               {modal === 0 && <DeleteModals opened={opened} close={close} title={`Подтвердите удаление`} onClick={onDelete} />}
          </Group >
     )
}
