import { Tabs } from "@mantine/core"
import { MdAddCircleOutline, MdDelete } from "react-icons/md"
import { AddResultHistories } from "../app/components/add-result-histories"
import { DeleteResultHistories } from "../app/components/delete-result-histories"

export const ResultHistory = () => {
  

  return (
    <Tabs defaultValue="add" variant="pills" radius="xs" >
      <Tabs.List>
        <Tabs.Tab value="add" leftSection={<MdAddCircleOutline size={12} />}>
          Добавить результаты
        </Tabs.Tab>
        <Tabs.Tab value="delete" leftSection={<MdDelete size={12} />} color='red'>
          Удалить результаты
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="add" className='p-5'>
        <AddResultHistories />
      </Tabs.Panel>

      <Tabs.Panel value="delete" className='p-5'>
        <DeleteResultHistories />
      </Tabs.Panel>
    </Tabs>
  )
}
