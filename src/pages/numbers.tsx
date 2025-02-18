import { Tabs } from '@mantine/core';
import { MdAddCircleOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AddNumbers } from '../app/components/add-numbers';
import { DeleteNumbers } from '../app/components/delete-numbers';


export const Numbers = () => {
  return (
    <Tabs defaultValue="add" variant="pills" radius="xs" >
      <Tabs.List>
        <Tabs.Tab value="add" leftSection={<MdAddCircleOutline size={12} />}>
          Добавить номера
        </Tabs.Tab>
        <Tabs.Tab value="delete" leftSection={<MdDelete size={12} />} color='red'>
          Удалить номера
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="add" className='p-5'>
        <AddNumbers />
      </Tabs.Panel>

      <Tabs.Panel value="delete" className='p-5'>
        <DeleteNumbers />
      </Tabs.Panel>
    </Tabs>
  )
}