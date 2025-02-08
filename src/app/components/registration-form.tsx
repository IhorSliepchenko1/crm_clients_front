import { useForm } from "@mantine/form";
import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { Register } from "../types";
import { useLazyGetAllUsersQuery, useRegisterMutation } from "../services/userApi";
import { hasErrorField } from "../../utils/has-error-field";
import { ErrorMessage } from "./error-message";
// import { notifications } from '@mantine/notifications';
// import classes from './test.module.css';

export const RegistrationForm = () => {
     const form = useForm<Register>({
          mode: 'uncontrolled',
          initialValues: { login: '', password: '', role: "USER" },
          validate: {
               login: (value) => (value.length < 5 ? 'Минимальная длинна логина 5 символов!' : null),
               password: (value) => (value.length < 6 ? 'Минимальная длинна пароля 6 символов!' : null),
               role: (value) => (!value ? 'Роль обязательна при регистрации!' : null),
          },
     });

     const [registration, { isLoading }] = useRegisterMutation()
     const [error, setError] = useState("")
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()

     const onSubmit = async (data: Register) => {
          try {
               await registration(data).unwrap()
               await triggerAllUsersQuery().unwrap()
               form.reset()
          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     // const errorNotificaton = () => notifications.show({
     //      color: 'red',
     //      title: 'Произошла ошибка!',
     //      message: error,
     //      classNames: classes,
     // })


     return (
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label="Логин"
                    placeholder="Введите логин"
                    key={form.key('login')}
                    {...form.getInputProps('login')}
               />
               <PasswordInput
                    mt="sm"
                    label="Пароль"
                    placeholder="Введите пароль"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
               />

               <Select
                    label="Роль"
                    placeholder="Выберите роль пользователя"
                    data={['ADMIN', 'USER']}
                    searchable
                    key={form.key('role')}
                    {...form.getInputProps('role')}
               />
               <Button type="submit" mt="sm" loading={isLoading} loaderProps={{ type: 'dots' }}>
                    Добавить пользователя
               </Button>
               <ErrorMessage error={error} setError={setError} />
          </form>
     )
}
