import { IconX } from '@tabler/icons-react';
import { Notification } from '@mantine/core';

export const ErrorMessage: React.FC<{ error: string, setError: React.Dispatch<React.SetStateAction<string>> }> = ({ error = '', setError }) => {
     const xIcon = <IconX size={20} />;

     return error && <div className='mt-2'><Notification icon={xIcon} color="red" title="Ошибка!" onClick={() => setError('')}>
          {error}
     </Notification></div>
}
