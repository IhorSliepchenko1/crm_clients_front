import { useCheckValidToken } from '../../../hooks/useCheckValidToken'
import { ButtonModalOpen } from '../../button/button-open-modal'

type Props = {
     openUpdateModal: () => void
     openDeleteModal: () => void
     id: number
}

export const OpenModalComponent: React.FC<Props> = ({ id, openUpdateModal, openDeleteModal }) => {
     const { decoded } = useCheckValidToken()

     return (
          <div className="flex items-center gap-2">
               {(decoded.role === "ADMIN" || (decoded.role === "USER" && decoded.id === id)) && (
                    <ButtonModalOpen onClick={openUpdateModal} text="Изменить" typeColor="EDIT" />
               )}
               {decoded.role === "ADMIN" && <ButtonModalOpen onClick={openDeleteModal} text="Удалить" typeColor="DELETE" />}
          </div>
     )
}
