import { Button } from "@mantine/core"

type Props = {
     loading: boolean
     disabled?: boolean
     text: string
     color?: string
}

export const ButtonSubmit: React.FC<Props> = ({ loading, disabled = false, text, color }) => {
     return (
          <Button
               type="submit"
               loading={loading}
               loaderProps={{ type: "dots" }}
               disabled={disabled}
               color={color}
          >
               {text}
          </Button>
     )
}
