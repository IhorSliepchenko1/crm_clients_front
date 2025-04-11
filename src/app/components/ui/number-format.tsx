import { NumberFormatter } from '@mantine/core'

export const NumberFormat: React.FC<{ num: number }> = ({ num }) => {
     return (
          <NumberFormatter value={num}
               thousandSeparator=" "
               decimalSeparator="," />
     )
}
