import { useCheckValidToken } from '../hooks/useCheckValidToken'
import { ActionButton } from './button/action-button'

type Props = {
     openUpdateModal: () => void
     openDeleteModal: () => void
     id: number
}

export const ActionComponent: React.FC<Props> = ({ id, openUpdateModal, openDeleteModal }) => {
     const { decoded } = useCheckValidToken()

     return (
          <div className="flex items-center gap-2">
               {(decoded.role === "ADMIN" || (decoded.role === "USER" && decoded.id === id)) && (
                    <ActionButton onClick={openUpdateModal} text="Изменить" type="EDIT" />
               )}
               {decoded.role === "ADMIN" && <ActionButton onClick={openDeleteModal} text="Удалить" type="DELETE" />}
          </div>
     )
}
