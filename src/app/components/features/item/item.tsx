import { Group } from '@mantine/core'
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useDisclosure } from '@mantine/hooks';
import { useDeleteCityMutation, useLazyGetAllCityQuery } from '../../../services/cityApi';
import { useDeleteTypeNumberMutation, useLazyGetAllTypeNumberQuery } from '../../../services/typeNumberApi';
import { DeleteModals } from '../../modals/delete-modals';
import { UpdateCityAndResultModal } from '../../modals/update-city-and-result';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';
import { OpenModalComponent } from '../../open-modal-component';
import { useDeleteResultMutation, useLazyGetAllResultQuery } from '../../../services/resultApi';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { ROLES } from '../../../../utils/role-list';
import { useMemo } from 'react';
import { UpdateTypeNumberModal } from '../../modals/update-type-number';
import { errorMessages } from '../../../../utils/has-error-field';

type Props = {
     nameItem: "city" | "type" | "result"
     id: number
     index: number
     name: string
     color?: string
}

export const Item: React.FC<Props> = ({ nameItem, id, index, name, color = "" }) => {
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
     }, [nameItem]);


     const deleteItem = async () => {
          try {
               await actions?.delete(id).unwrap();
               succeed(`${actions?.text} '${name}' удалён!`)
               await actions?.refresh().unwrap();
               close()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     return (
          <Group justify="space-between">
               <div className="flex gap-2">
                    <div>{index}.</div>
                    <div style={{ background: nameItem === "type" && color ? color : "" }}>{name}</div>
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

                         <UpdateCityAndResultModal
                              opened={opened}
                              close={close}
                              nameItem={nameItem as "city" | "result"}
                              id={id} name={name}
                              typeModal={typeModal}
                         />

                         {nameItem === "type" &&
                              <UpdateTypeNumberModal
                                   opened={opened}
                                   close={close}
                                   id={id}
                                   name={name}
                                   typeModal={typeModal}
                                   color={color}
                              />}
                    </>
               }

          </Group >
     )
}
