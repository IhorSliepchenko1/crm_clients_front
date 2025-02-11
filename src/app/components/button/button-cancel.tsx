import { Button } from "@mantine/core"

type Props = {
     close: () => void
}

export const ButtonCancel: React.FC<Props> = ({ close }) => {
     return (
          <Button onClick={close} variant="default">Отмена</Button>
     )
}
