import { Group } from '@mantine/core'
import { useNotification } from '../../../hooks/useNotification/useNotification';
import { useDisclosure } from '@mantine/hooks';
import { useCheckValidToken } from '../../../hooks/useCheckValidToken';
import { useDeleteCityMutation, useLazyGetAllCityQuery } from '../../../services/cityApi';
import { useDeleteTypeNumberMutation, useLazyGetAllTypeNumberQuery } from '../../../services/typeNumberApi';
import { hasErrorField } from '../../../../utils/has-error-field';
import { OpenModalComponent } from '../open-modal-component';
import { DeleteModals } from '../../modals/delete-modals';
import { UpdateItemModal } from '../../modals/update-item';
import { useChangeTypeModal } from '../../../hooks/useChangeTypeModal';

type Props = {
     nameItem: "city" | "type"
     id: number
     index: number
     name: string
}

export const Item: React.FC<Props> = ({ nameItem, id, index, name }) => {
     const [opened, { open, close }] = useDisclosure(false);
     const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
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

     const deleteItem = async () => {
          try {
               await actions[nameItem].delete(id).unwrap();
               succeed(`${nameItem === "city" ? "Город" : "Тип базы"} '${name}' удалён!`)
               await actions[nameItem].refresh().unwrap();
               close()

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error("Что-то пошло не так. Попробуйте снова.")
          }
     }

     return (
          <Group justify="space-between">
               <div className="flex gap-2">
                    <div>{index}.</div>
                    <div>{name}</div>
               </div>
               <OpenModalComponent
                    id={decoded.id}
                    openUpdateModal={openUpdateModal}
                    openDeleteModal={openDeleteModal}
               />

               <DeleteModals
                    opened={opened}
                    close={close}
                    title={`Подтвердите удаление`}
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

          </Group >
     )
}
