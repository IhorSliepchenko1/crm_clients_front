import { useForm } from "@mantine/form";
import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { Register } from "../types";
import { useLazyGetAllUsersQuery, useRegisterMutation } from "../services/userApi";
import { hasErrorField } from "../../utils/has-error-field";
import { useNotification } from "../hooks/useNotification";

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
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()

     const { notificationMessage } = useNotification()

     const onSubmit = async (data: Register) => {
          try {
               await registration(data).unwrap()
               await triggerAllUsersQuery().unwrap()
               form.reset()

               notificationMessage({
                    message: "Пользователь добавлен!",
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
     
     return (
          <>
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
               </form>
          </>
     )
}
