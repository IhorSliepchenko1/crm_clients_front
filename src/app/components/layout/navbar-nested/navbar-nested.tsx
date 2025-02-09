import { TbReportAnalytics, TbHistory } from "react-icons/tb";
import { BsDatabaseFillDown, BsDatabaseAdd } from "react-icons/bs";
import { FiPlusSquare } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

import { Button, ScrollArea } from '@mantine/core';
import classes from './navbar-nested.module.css';
import { LinksGroup } from '../../links-group/links-group';
import { SwitchTheme } from '../../switch-theme';
import { useAppDispatch } from '../../../hooks';
import { logout } from '../../../../features/user/userSlice';
import { useCheckValidToken } from "../../../hooks/useCheckValidToken";

const mockdata = [
     {
          label: 'Отчет',
          icon: TbReportAnalytics,
          link: '/'
     },
     {
          label: 'Скачать базу',
          icon: BsDatabaseFillDown,
          link: '/filter-database'
     },
     {
          label: 'Добавления',
          icon: FiPlusSquare,
          initiallyOpened: true,
          links: [
               { label: 'Пользователи', link: '/registration' },
               { label: 'Города', link: '/city' },
               { label: 'Типы базы', link: '/type-number' },
               { label: 'Результаты прозвона', link: '/result' },
          ],
     },
     {
          label: 'Импорт базы',
          icon: BsDatabaseAdd,
          links: [
               { label: 'Новая база', link: '/add-numbers' },
               { label: 'База пришедших', link: '/add-guest' },
               { label: 'База истории прозвона', link: '/add-result-history' },
          ],
     },
     {
          label: 'История',
          icon: TbHistory,
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

     const { decoded } = useCheckValidToken()

     return (
          <nav className={classes.navbar}>
               <div className={classes.header}>
                    <div className="flex items-center justify-between w-[100%]">
                         <p>{decoded.login}</p>
                         <SwitchTheme />
                    </div>
               </div>

               <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>
                         {links}
                    </div>
               </ScrollArea>
               <div className={classes.btn}>
                    <Button
                         className="min-w-[100%]"
                         variant="outline"
                         leftSection={<CiLogout size={14} />}
                         onClick={logoutSession}
                    >
                         выйти
                    </Button>
               </div>
          </nav>
     )
}
