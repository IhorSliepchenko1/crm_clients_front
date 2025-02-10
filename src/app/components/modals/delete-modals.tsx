import { Modal, Button } from "@mantine/core";

type Props = {
     opened: boolean
     close: () => void
     title?: string
     deleteUser: () => Promise<void>
}
export const DeleteModals: React.FC<Props> = ({ opened, close, title, deleteUser }) => {

     return (
          <Modal opened={opened} onClose={close} title={title}>
               <div className="flex justify-between mt-5">
                    <Button onClick={() => close()} variant="default">Отмена</Button>
                    <Button onClick={deleteUser} color="red">Удалить</Button>
               </div>
          </Modal>
     )
}
