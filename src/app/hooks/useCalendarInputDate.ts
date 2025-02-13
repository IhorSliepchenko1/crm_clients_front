export const useCalendarInputDate = () => {

     const calendarDate = (date: Date | string) => {
          const initial = new Date(date)

          const dd = `${initial.getDate()}`.padStart(2, "0")
          const mm = `${initial.getMonth() + 1}`.padStart(2, "0")
          const yyyy = `${initial.getFullYear()}`.padStart(2, "0")

          return `${dd}.${mm}.${yyyy} ${initial.getHours()}:${initial.getMinutes()}`
     }

     return { calendarDate }
}