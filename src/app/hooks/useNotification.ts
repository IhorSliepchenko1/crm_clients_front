import { notifications } from '@mantine/notifications';
import style from "../../style/notification-message.module.css"

type NotificationMessage = {
     type: 'error' | "succeed"
     message: string
}

export const useNotification = () => {
     const notificationMessage = ({ type, message }: NotificationMessage) =>
          notifications.show({
               color: type === 'error' ? "red" : "green",
               title: type === 'error' ? "Ошибка!" : "Успешно!",
               message: message,
               position: 'top-right',
               classNames: style
          })

     return { notificationMessage }
}