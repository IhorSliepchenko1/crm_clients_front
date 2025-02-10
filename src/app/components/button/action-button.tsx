import { Button } from "@mantine/core"
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"

type Props = {
     onClick: () => void
     text: string
     type: "DELETE" | "EDIT"
}


export const ActionButton: React.FC<Props> = ({ onClick, text, type }) => {
     return (
          <Button
               onClick={onClick}
               variant="filled"
               size="xs"
               leftSection={type === "DELETE" ? <MdDelete /> : <MdEdit />}
               color={type === "DELETE" ? "red" : "yellow"} >
               {text}
          </Button>
     )
}
