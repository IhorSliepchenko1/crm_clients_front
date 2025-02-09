import React, { useEffect, useState } from 'react'
import { useNotification } from '../../hooks/useNotification'
import { useLazyGetAllUsersQuery, useUpdateUserMutation } from '../../services/userApi'
import { hasErrorField } from '../../../utils/has-error-field'
import { Button, Modal, PasswordInput, Select, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

type Props = {
     login: string,
     role: "ADMIN" | "USER"
     id: number
     opened: boolean
     close: () => void
}

type SubmitData = {
     login: string
     newPassword: string
     oldPassword: string
     role: "ADMIN" | "USER"
}

export const UpdateUserModal: React.FC<Props> = ({ id, login, role, opened, close }) => {
     const initialValues = {
          login: login,
          newPassword: '',
          oldPassword: '',
          role: role
     }

     const form = useForm<SubmitData>({
          mode: 'uncontrolled',
          initialValues,
          validate: {
               login: (value) => (value ? value.length < 5 ? 'Минимальная длинна логина 5 символов!' : null : null),
               newPassword: (value) => (value ? value.length < 6 ? 'Минимальная длинна пароля 6 символов!' : null : null),
               oldPassword: (value) => (value ? value.length < 6 ? 'Минимальная длинна пароля 6 символов!' : null : null),
          },
     });

     const [disabled, setDisabled] = useState(true)
     const [updateUserMutation] = useUpdateUserMutation()
     const { notificationMessage } = useNotification()
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()

     const updateUser = async (data: SubmitData) => {
          try {
               await updateUserMutation({ id, data }).unwrap()
               await triggerAllUsersQuery().unwrap()

               notificationMessage({
                    message: `Пользователь ${login} обновлён!`,
                    type: 'succeed'
               })
               close()
          }

          catch (err) {
               if (hasErrorField(err)) {
                    notificationMessage({
                         message: err.data.message,
                         type: 'error'
                    })
               }
          }
     }

     useEffect(() => {
          const { login: prevLogin, role: prevRole, newPassword, oldPassword } = form.getValues()
          setDisabled(prevLogin !== login || prevRole !== role || newPassword.length > 0 || oldPassword.length > 0 ? false : true)
     }, [form.getValues()])

     const onClose = () => {
          close();
          form.reset();
     }
     
     return (
          <Modal opened={opened} onClose={() => onClose()} title="Обновление информации о пользователе" >
               <form onSubmit={form.onSubmit(updateUser)}>
                    <TextInput
                         label="Логин"
                         placeholder="Введите логин"
                         defaultValue={login}
                         key={form.key('login')}
                         {...form.getInputProps('login')}
                    />
                    <PasswordInput
                         mt="sm"
                         label="Текущий пароль"
                         placeholder="Введите текущий пароль"
                         key={form.key('oldPassword')}
                         {...form.getInputProps('oldPassword')}
                    />
                    <PasswordInput
                         mt="sm"
                         label="Новый пароль"
                         placeholder="Введите новый пароль"
                         key={form.key('newPassword')}
                         {...form.getInputProps('newPassword')}
                    />

                    <Select
                         label="Роль"
                         defaultValue={role}
                         placeholder="Выберите роль пользователя"
                         data={['ADMIN', 'USER']}
                         searchable
                         key={form.key('role')}
                         {...form.getInputProps('role')}
                    />
                    <div className='flex justify-between mt-5'>
                         <Button onClick={() => {
                              close()
                              form.reset();
                         }} variant="default">Отмена</Button>
                         <Button type='submit' color='blue' disabled={disabled}>Изменить</Button>
                    </div>
               </form>
          </Modal>
     )
}
