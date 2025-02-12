import { ButtonModalOpen } from "./button/button-open-modal"


type Props = {
     openUpdateModal: () => void
     openDeleteModal: () => void
}

export const OpenModalComponent: React.FC<Props> = ({ openUpdateModal, openDeleteModal }) => {

     return (
          <div className="flex items-center gap-2">
               <ButtonModalOpen onClick={openUpdateModal} text="Изменить" typeColor="EDIT" />
               <ButtonModalOpen onClick={openDeleteModal} text="Удалить" typeColor="DELETE" />
          </div>
     )
}
