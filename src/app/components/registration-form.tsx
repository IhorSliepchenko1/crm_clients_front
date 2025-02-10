import { useForm } from "@mantine/form";
import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { Register } from "../types";
import { useLazyGetAllUsersQuery, useRegisterMutation } from "../services/userApi";
import { hasErrorField } from "../../utils/has-error-field";
import { useNotification } from "../hooks/useNotification";
import { useCheckValidToken } from "../hooks/useCheckValidToken";

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
     const { decoded } = useCheckValidToken()
     const { succeed, error } = useNotification()

     const onSubmit = async (data: Register) => {
          try {
               await registration(data).unwrap()
               succeed("Пользователь добавлен!")
               form.reset()
               await triggerAllUsersQuery().unwrap()

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error('Что-то пошло не так. Попробуйте снова.')
          }
     }


     const roles = ['ADMIN', 'USER']
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
                         data={decoded.role === "ADMIN" ? roles : ["USER"]}
                         searchable
                         key={form.key('role')}
                         {...form.getInputProps('role')}
                    />
                    {decoded.role !== "ADMIN" && <p className="text-red-500">Регистрация учетных записей администратора доступна только для роли ADMIN</p>}
                    <Button type="submit" mt="sm" loading={isLoading} loaderProps={{ type: 'dots' }}>
                         Добавить пользователя
                    </Button>
               </form>
          </>
     )
}
