import { Group } from '@mantine/core'
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteCityMutation, useLazyGetAllCityQuery } from '../../../services/cityApi';
import { useDeleteTypeNumberMutation, useLazyGetAllTypeNumberQuery } from '../../../services/typeNumberApi';
import { hasErrorField } from '../../../../utils/has-error-field';
import { DeleteModals } from '../../modals/delete-modals';
import { UpdateItemModal } from '../../modals/update-item';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';
import { OpenModalComponent } from '../../open-modal-component';
import { useDeleteResultMutation, useLazyGetAllResultQuery } from '../../../services/resultApi';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { ROLES } from '../../../../utils/role-list';
import { useMemo } from 'react';

type Props = {
     nameItem: "city" | "type" | "result"
     id: number
     index: number
     name: string
}

export const Item: React.FC<Props> = ({ nameItem, id, index, name }) => {
     const [opened, { open, close }] = useDisclosure(false);
     const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const [deleteCityMutation] = useDeleteCityMutation()
     const [triggerAllCityQuery] = useLazyGetAllCityQuery()

     const [deleteTypeNumberMutation] = useDeleteTypeNumberMutation()
     const [triggerAllTypeNumberQuery] = useLazyGetAllTypeNumberQuery()

     const [deleteResultMutation] = useDeleteResultMutation()
     const [triggerAllResultQuery] = useLazyGetAllResultQuery()

     const actions = useMemo(() => {
          switch (nameItem) {
               case 'city':
                    return { delete: deleteCityMutation, refresh: triggerAllCityQuery, text: "Город" };
               case 'type':
                    return { delete: deleteTypeNumberMutation, refresh: triggerAllTypeNumberQuery, text: "Тип базы" };
               case 'result':
                    return { delete: deleteResultMutation, refresh: triggerAllResultQuery, text: "Результат" };
               default:
                    return
          }
     }, [nameItem, deleteCityMutation, triggerAllCityQuery, deleteTypeNumberMutation, triggerAllTypeNumberQuery, deleteResultMutation, triggerAllResultQuery]);


     const deleteItem = async () => {
          try {
               await actions?.delete(id).unwrap();
               succeed(`${actions?.text} '${name}' удалён!`)
               await actions?.refresh().unwrap();
               close()

          } catch (err: any) {
               console.error(err);
               const message = hasErrorField(err)
                    ? err?.data?.message
                    : err?.message ?? "Что-то пошло не так. Попробуйте снова.";

               error(message);
          }
     }

     return (
          <Group justify="space-between">
               <div className="flex gap-2">
                    <div>{index}.</div>
                    <div>{name}</div>
               </div>
               {
                    decoded.role === ROLES.ADMIN &&
                    <>
                         <OpenModalComponent
                              openUpdateModal={openUpdateModal}
                              openDeleteModal={openDeleteModal}
                         />

                         <DeleteModals
                              opened={opened}
                              close={close}
                              title={`Подтвердите удаление '${name}'`}
                              onClick={deleteItem}
                              typeModal={typeModal}
                         />

                         <UpdateItemModal
                              opened={opened}
                              close={close}
                              nameItem={nameItem}
                              id={id} name={name}
                              typeModal={typeModal}
                         />
                    </>
               }

          </Group >
     )
}
