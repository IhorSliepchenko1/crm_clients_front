import { CiLogout } from "react-icons/ci";
import { TbReportAnalytics, TbHistory } from "react-icons/tb";
import { BsDatabaseFillDown, BsDatabaseAdd } from "react-icons/bs";
import { FiPlusSquare } from "react-icons/fi";
import { ROLES } from "../../../../utils/role-list";

export const data = (logoutSession: () => void) => {

     return [
          {
               label: "Отчет",
               icon: TbReportAnalytics,
               link: "/",
               access: [ROLES.VIEWER, ROLES.ADMIN, ROLES.USER]
          },
          {
               label: "Скачать базу",
               icon: BsDatabaseFillDown,
               link: "/filter-database",
               access: [ROLES.ADMIN, ROLES.USER]
          },
          {
               label: "Добавления",
               icon: FiPlusSquare,
               links: [
                    { label: "Пользователи", link: "/users" },
                    { label: "Города", link: "/city" },
                    { label: "Типы базы", link: "/type-number" },
               ],
               access: [ROLES.ADMIN]
          },
          {
               label: "Импорт базы",
               icon: BsDatabaseAdd,
               links: [
                    { label: "Новая база", link: "/add-numbers" },
                    { label: "База пришедших", link: "/add-guest" },
                    { label: "База истории прозвона", link: "/add-result-history" },
               ],
               access: [ROLES.ADMIN, ROLES.USER]
          },
          {
               label: "История",
               icon: TbHistory,
               links: [
                    { label: "История удаления", link: "/histories-delete" },
                    { label: "История импортов", link: "/histories-import" },
               ],
               access: [ROLES.ADMIN, ROLES.USER]
          },

          {
               label: "Выйти",
               icon: CiLogout,
               link: "/",
               onClick: logoutSession,
               logout: true,
               access: [ROLES.VIEWER, ROLES.ADMIN, ROLES.USER]
          },
     ];
}