import { useState } from "react"

type Props = {
     open: () => void
}

export const useChangeTypeModal = ({ open }: Props) => {
     const [typeModal, setTypeModal] = useState<"delete" | "update">("update")

     const openUpdateModal = () => {
          setTypeModal("update")
          open()
     }

     const openDeleteModal = () => {
          setTypeModal("delete")
          open()
     }

     return { typeModal, openUpdateModal, openDeleteModal }
}