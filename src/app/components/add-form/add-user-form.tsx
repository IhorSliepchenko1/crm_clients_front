import { useForm } from "@mantine/form";
import { PasswordInput, Select, TextInput } from "@mantine/core";
import { Register } from "../../types";
import { useLazyGetAllUsersQuery, useRegisterMutation } from "../../services/userApi";
import { hasErrorField } from "../../../utils/has-error-field";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { ButtonSubmit } from "../button/button-submit";
import { ROLES, roles } from "../../../utils/role-list";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";

export const AddUserForm = () => {
     const form = useForm<Register>({
          mode: "uncontrolled",
          initialValues: { login: "", password: "", role: "USER" },
          validate: {
               login: (value) => (value.length < 5 ? "Минимальная длинна логина 5 символов!" : null),
               password: (value) => (value.length < 6 ? "Минимальная длинна пароля 6 символов!" : null),
          },
     });

     const [registration, { isLoading }] = useRegisterMutation()
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()
     
     const onSubmit = async (data: Register) => {
          try {
               await registration(data).unwrap()
               succeed("Пользователь добавлен!")
               form.reset()
               await triggerAllUsersQuery().unwrap()

          } catch (err) {
               console.error(err);
               if (hasErrorField(err)) error(err.data.message)
               else error("Что-то пошло не так. Попробуйте снова.")
          }
     }


     return (
          decoded.role === ROLES.ADMIN &&  <form onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-2">
               <TextInput
                    label="Логин"
                    placeholder="Введите логин"
                    key={form.key("login")}
                    {...form.getInputProps("login")}
               />
               <PasswordInput
                    label="Пароль"
                    placeholder="Введите пароль"
                    key={form.key("password")}
                    {...form.getInputProps("password")}
               />
               <Select
                    label="Роль"
                    placeholder="Выберите роль пользователя"
                    data={roles}
                    searchable
                    key={form.key("role")}
                    {...form.getInputProps("role")}
               />
               <ButtonSubmit loading={isLoading} text={"Добавить пользователя"} />
          </form>
     )
}
