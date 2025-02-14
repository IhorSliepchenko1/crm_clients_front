import { Pagination as PaginationMantine } from "@mantine/core";


type Props = {
     total: number
     setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<Props> = ({ total, setPage }) => {
     return (
          <div className="flex justify-center mt-5">
               <PaginationMantine total={total} defaultValue={1} onChange={setPage} />
          </div>
     )
}
