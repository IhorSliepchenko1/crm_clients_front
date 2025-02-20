import { Group, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DeleteModals } from "../../modals/delete-modals";
import { useDeleteUserMutation, useLazyGetAllUsersQuery } from "../../../services/userApi";
import { useNotification } from "../../../hooks/useNotification/useNotification";
import { useCheckValidToken } from "../../../hooks/useCheckValidToken";
import { UpdateUserModal } from "../../modals/update-user";
import { useChangeTypeModal } from "../../../hooks/useChangeTypeModal";
import { OpenModalComponent } from "../../ui/open-modal-component";
import { ROLES } from "../../../types";
import { errorMessages } from "../../../../utils/has-error-field";

type Props = {
     role: ROLES,
     login: string,
     id: number
}

export const User: React.FC<Props> = ({ role, login, id }) => {
     const [opened, { open, close }] = useDisclosure(false);
     const { typeModal, openUpdateModal, openDeleteModal } = useChangeTypeModal({ open })
     const [triggerAllUsersQuery] = useLazyGetAllUsersQuery()
     const [deeleteUserMutation] = useDeleteUserMutation()
     const { succeed, error } = useNotification()
     const { decoded } = useCheckValidToken()

     const deleteUser = async () => {
          if (decoded.id === id) {
               error("Свою учетную запись удалить нельзя!")
               close()
               return
          }

          try {
               await deeleteUserMutation(id).unwrap()
               succeed(`Пользователь '${login}' удалён!`)
               await triggerAllUsersQuery().unwrap()

          } catch (err) {
               error(errorMessages(err));
          }
     }

     const colorRole = (role: ROLES) => {
          switch (role) {
               case "ADMIN":
                    return "green"
               case "USER":
                    return "orange"
               case "VIEWER":
                    return "yellow"
               default: return
          }
     }

     return (
          <Group justify="space-between">
               <div className="flex items-center gap-3">
                    <Badge className="min-w-[100px]" color={colorRole(role)}>роль: {role} </Badge>
                    <p>
                         {login}
                         <span className="text-red-600">{decoded.id === id && " (ВЫ)"}</span>
                    </p>
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
                              title={`Подтвердите удаление аккаунта '${login}'`}
                              onClick={deleteUser}
                              typeModal={typeModal} />

                         <UpdateUserModal
                              id={id}
                              login={login}
                              role={role}
                              opened={opened}
                              close={close}
                              typeModal={typeModal}
                         />
                    </>
               }

          </Group >
     )
}

