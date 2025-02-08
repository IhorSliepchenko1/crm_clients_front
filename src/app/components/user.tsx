import { Group, Button, Badge } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type Props = { role: "ADMIN" | "USER", login: string, id: number }

export const User: React.FC<Props> = ({ role, login, id }) => {
     return (
          <Group justify="space-between">
               <div className='flex items-center gap-3'>
                    <Badge className='min-w-[100px]' color={role === "ADMIN" ? "green" : "orange"}>роль: {role}</Badge>
                    <p>{login}</p>
               </div>
               <div className='flex items-center gap-2'>
                    <Button variant="light" size="xs" leftSection={<IconEdit size={10} />} color="yellow">Изменить</Button>
                    <Button variant="light" size="xs" leftSection={<IconTrash size={10} />} color="red">Удалить</Button>
               </div>
          </Group>
     )
}
