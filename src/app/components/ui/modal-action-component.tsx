import { ButtonCancel } from "../button/button-cancel";
import { ButtonSubmit } from "../button/button-submit";

type Props = {
  close: () => void;
  loading: boolean;
  text?: string;
  disabled?: boolean;
};

export const ModalActionComponent: React.FC<Props> = ({
  close,
  loading,
  text = "Подтвердить",
  disabled = false,
}) => {
  return (
    <div className="flex justify-between mt-5">
      <ButtonCancel close={close} />
      <ButtonSubmit loading={loading} text={text} disabled={disabled} />
    </div>
  );
};
