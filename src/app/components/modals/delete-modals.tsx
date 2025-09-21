import { Modal, Button } from "@mantine/core";
import { ButtonCancel } from "../button/button-cancel";

type Props = {
  opened: boolean;
  close: () => void;
  title?: string;
  onClick: () => Promise<void>;
  typeModal: "delete" | "update";
};
export const DeleteModals: React.FC<Props> = ({
  opened,
  close,
  title,
  onClick,
  typeModal,
}) => {
  return (
    typeModal === "delete" && (
      <Modal opened={opened} onClose={close} title={title}>
        <div className="flex justify-between mt-5">
          <ButtonCancel close={close} />
          <Button onClick={onClick} color="red">
            Удалить
          </Button>
        </div>
      </Modal>
    )
  );
};
