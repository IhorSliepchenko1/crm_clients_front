import { Button } from "@mantine/core"

type Props = {
     loading: boolean
     disabled?: boolean
     text: string
     color?: string
     size?: string
}

export const ButtonSubmit: React.FC<Props> = ({ loading, disabled = false, text, color, size }) => {
     return (
          <Button
               type="submit"
               loading={loading}
               loaderProps={{ type: "dots" }}
               disabled={disabled}
               color={color}
               size={size}
          >
               {text}
          </Button>
     )
}
