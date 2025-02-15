import React, { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { useLazyGetAllUsersQuery, useUpdateUserMutation } from "../../services/userApi";
import { hasErrorField } from "../../../utils/has-error-field";
import { Modal, PasswordInput, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ModalActionComponent } from "../ui/modal-action-component";
import { ROLES } from "../../types";
import { roles } from "../../../utils/role-list";

type Props = {
     login: string;
     role: ROLES;
     id: number;
     opened: boolean;
     close: () => void;
     typeModal: "delete" | "update"
};

type SubmitData = {
     login: string
     newPassword: string
     oldPassword: string
     role: ROLES
};

export const UpdateUserModal: React.FC<Props> = ({ id, login, role, opened, close, typeModal }) => {
     const form = useForm<SubmitData>({
          initialValues: {
               login,
               newPassword: "",
               oldPassword: "",
               role,
          },
          validate: {
               login: (value) => (value.length < 5 ? "Минимальная длина логина 5 символов!" : null),
               newPassword: (value) => (value && value.length < 6 ? "Минимальная длина пароля 6 символов!" : null),
               oldPassword: (value) => (value && value.length < 6 ? "Минимальная длина пароля 6 символов!" : null),
          },
     });

     const [updateUserMutation, { isLoading }] = useUpdateUserMutation();
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery();
     const { succeed, error } = useNotification();

     useEffect(() => {
          if (opened) {
               form.setValues({
                    login,
                    newPassword: "",
                    oldPassword: "",
                    role,
               });
               form.resetDirty();
          }
     }, [opened]);

     const updateUser = async (data: SubmitData) => {
          try {
               await updateUserMutation({ id, data }).unwrap();
               succeed("Пользователь обновлён!");
               close();
               await triggerAllUsersQuery().unwrap();
          } catch (err: any) {
               console.error(err);
               const message = hasErrorField(err) ? err.data.message : err.message || "Что-то пошло не так. Попробуйте снова.";
               error(message);
          }
     };

     return (
          typeModal === "update" && <Modal opened={opened} onClose={close} title="Обновление информации о пользователе">
               <form onSubmit={form.onSubmit(updateUser)}>
                    <TextInput
                         label="Логин"
                         placeholder="Введите логин"
                         {...form.getInputProps("login")}
                    />
                    <PasswordInput
                         label="Текущий пароль"
                         placeholder="Введите текущий пароль"
                         {...form.getInputProps("oldPassword")}
                    />
                    <PasswordInput
                         label="Новый пароль"
                         placeholder="Введите новый пароль"
                         {...form.getInputProps("newPassword")}
                    />
                    <Select
                         label="Роль"
                         placeholder="Выберите роль пользователя"
                         data={roles}
                         {...form.getInputProps("role")}
                    />
                    <ModalActionComponent
                         disabled={!form.isDirty()}
                         loading={isLoading}
                         close={close}
                    />
               </form>
          </Modal>
     );
};
