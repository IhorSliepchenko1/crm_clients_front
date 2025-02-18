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
               label: "Выбрать базу",
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
                    { label: "Типы баз", link: "/type-number" },
                    { label: "Результаты", link: "/result" },
               ],
               access: [ROLES.ADMIN, ROLES.USER]
          },
          {
               label: "Импорт базы",
               icon: BsDatabaseAdd,
               links: [
                    { label: "Номера", link: "/numbers" },
                    { label: "Результаты", link: "/result-history" },
                    { label: "Гости", link: "/guest" },
               ],
               access: [ROLES.ADMIN, ROLES.USER]
          },
          {
               label: "История",
               icon: TbHistory,
               links: [
                    { label: "Импорты", link: "/histories-import" },
                    { label: "Удаления", link: "/histories-delete" },
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