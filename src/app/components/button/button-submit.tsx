import { Button } from "@mantine/core"

type Props = {
     loading: boolean
     text: string
     disabled?: boolean
}

export const ButtonSubmit: React.FC<Props> = ({ loading, text, disabled = false }) => {
     return (
          <Button type="submit" loading={loading} loaderProps={{ type: "dots" }} disabled={disabled}>
               {text}
          </Button>
     )
}
