import { Tabs } from '@mantine/core'
import { MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { AddResultAndGuest } from './add-result-and-guest'
import { DeleteResultAndGuest } from './delete-result-and-guest'

type Props = {
     type: "result" | "guest"
}

export const ResultAndGuestTabs: React.FC<Props> = ({ type }) => {
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
                    <AddResultAndGuest type={type} />
               </Tabs.Panel>

               <Tabs.Panel value="delete" className='p-5'>
                    <DeleteResultAndGuest type={type} />
               </Tabs.Panel>
          </Tabs>
     )
}
