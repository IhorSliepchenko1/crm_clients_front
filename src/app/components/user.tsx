import { Group, Button, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdEdit, MdDelete } from "react-icons/md";
import { DeleteModals } from './modals/delete-modals';
import { useDeleteUserMutation, useLazyGetAllUsersQuery } from '../services/userApi';
import { hasErrorField } from '../../utils/has-error-field';
import { useNotification } from '../hooks/useNotification';
import { useCheckValidToken } from '../hooks/useCheckValidToken';
import { useState } from 'react';
import { UpdateUserModal } from './modals/update-user';

type Props = { role: "ADMIN" | "USER", login: string, id: number }

export const User: React.FC<Props> = ({ role, login, id }) => {
     const [modal, setModal] = useState<0 | 1>(0)
     const [opened, { open, close }] = useDisclosure(false);

     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()
     const [deeleteUserMutation] = useDeleteUserMutation()
     const { notificationMessage } = useNotification()
     const { decoded } = useCheckValidToken()

     const deleteUser = async () => {
          if (decoded.id === id) {
               notificationMessage({
                    message: "Свою учетную запись удалить нельзя!",
                    type: 'error'
               })
               close()
               return
          }

          try {
               await deeleteUserMutation(id).unwrap()
               await triggerAllUsersQuery().unwrap()

               notificationMessage({
                    message: `Пользователь ${login} удалён!`,
                    type: 'succeed'
               })

          } catch (err) {
               if (hasErrorField(err)) {
                    notificationMessage({
                         message: err.data.message,
                         type: 'error'
                    })
               }
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
               <div className='flex items-center gap-3'>
                    <Badge className='min-w-[100px]' color={role === "ADMIN" ? "green" : "orange"}>роль: {role}</Badge>
                    <p>{login}</p>
               </div>
               <div className='flex items-center gap-2'>
                    <Button onClick={openUpdateModal} variant="filled" size="xs" leftSection={<MdEdit size={10} />} color="yellow">Изменить</Button>
                    <Button onClick={openDeleteModal} variant="filled" size="xs" leftSection={<MdDelete size={10} />} color="red">Удалить</Button>
               </div>
               {modal === 0 && <DeleteModals opened={opened} close={close} title={`Подтвердите удаление аккаунта ${login}`} deleteUser={deleteUser} />}
               {modal === 1 && <UpdateUserModal id={id} login={login} role={role} opened={opened} close={close} />}
          </Group>
     )
}

