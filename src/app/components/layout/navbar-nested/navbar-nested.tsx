import {
     IconHistory,
     IconDatabasePlus,
     IconLogout,
     IconSquarePlus,
     IconPresentationAnalytics,
     IconDatabaseSearch,
} from '@tabler/icons-react';
import { Button, Group, ScrollArea } from '@mantine/core';
import classes from './navbar-nested.module.css';
import { LinksGroup } from '../../links-group/links-group';
import { SwitchTheme } from '../../switch-theme';
import { useAppDispatch } from '../../../hooks';
import { logout } from '../../../../features/user/userSlice';

const mockdata = [
     { label: 'Отчет', icon: IconPresentationAnalytics, link: '/' },
     { label: 'Фильтр баз', icon: IconDatabaseSearch, link: '/filter-database' },
     {
          label: 'Добавить',
          icon: IconSquarePlus,
          initiallyOpened: true,
          links: [
               { label: 'Пользователя', link: '/registration' },
               { label: 'Город', link: '/city' },
               { label: 'Тип базы', link: '/type-number' },
               { label: 'Результат прозвона', link: '/result' },
          ],
     },
     {
          label: 'Импорт базы',
          icon: IconDatabasePlus,
          links: [
               { label: 'Новая база', link: '/add-numbers' },
               { label: 'База пришедших', link: '/add-guest' },
               { label: 'База истории прозвона', link: '/add-result-history' },
          ],
     },
     {
          label: 'История',
          icon: IconHistory,
          links: [
               { label: 'История удаления', link: '/histories-delete' },
               { label: 'История импортов', link: '/histories-import' },
          ],
     },
];

export const NavbarNested = () => {
     const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
     const dispatch = useAppDispatch()

     const logoutSession = () => {
          dispatch(logout())
     }

     return (
          <nav className={classes.navbar}>
               <div className={classes.header}>
                    <SwitchTheme />
                    <Group justify="space-between">
                         <Button
                              variant="outline"
                              rightSection={<IconLogout size={14} />}
                              onClick={logoutSession}
                         >
                              выйти
                         </Button>
                    </Group>
               </div>

               <ScrollArea className={classes.links}>

                    <div className={classes.linksInner}>
                         {links}</div>
               </ScrollArea>
          </nav>
     )
}
