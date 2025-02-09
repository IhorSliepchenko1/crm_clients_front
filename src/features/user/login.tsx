import { useForm } from '@mantine/form';
import { TextInput, Button, PasswordInput } from '@mantine/core';
import { useLazyCheckQuery, useLoginMutation } from '../../app/services/userApi';
import { useNavigate } from 'react-router-dom';
import { hasErrorField } from '../../utils/has-error-field';
import { useNotification } from '../../app/hooks/useNotification';

export const Login = () => {
     const form = useForm<{ login: string, password: string }>({
          mode: 'uncontrolled',
          initialValues: { login: '', password: '' },
          validate: {
               login: (value) => (value.length < 5 ? 'Минимальная длинна логина 5 символов!' : null),
               password: (value) => (value.length < 6 ? 'Минимальная длинна пароля 6 символов!' : null),
          },
     });

     const [login, { isLoading }] = useLoginMutation()
     const navigate = useNavigate()
     const [triggerCurrentQuery] = useLazyCheckQuery()

     const { notificationMessage } = useNotification()

     const onSubmit = async (data: { login: string, password: string }) => {
          try {
               await login(data).unwrap()
               await triggerCurrentQuery().unwrap()
               form.reset()

               notificationMessage({
                    message: "Вы вошли в систему!",
                    type: 'succeed'
               })

               navigate("/")
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
          <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-4">
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

               <Button type="submit" mt="sm" loading={isLoading} loaderProps={{ type: 'dots' }}>
                    Войти
               </Button>
          </form>
     )
}
