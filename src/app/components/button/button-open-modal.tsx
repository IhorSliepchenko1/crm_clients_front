import { Button } from "@mantine/core"
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"

type Props = {
     onClick: () => void
     text: string
     typeColor: "DELETE" | "EDIT"
}


export const ButtonModalOpen: React.FC<Props> = ({ onClick, text, typeColor }) => {
     return (
          <Button
               onClick={onClick}
               variant="filled"
               size="xs"
               leftSection={typeColor === "DELETE" ? <MdDelete /> : <MdEdit />}
               color={typeColor === "DELETE" ? "red" : "yellow"} >
               {text}
          </Button>
     )
}
