import { Fieldset, Flex } from "@mantine/core";
import { SwitchTheme } from "../app/components/ui/switch-theme";
import { Login } from "../features/user/login";

export const Auth = () => {
  return (
    <Flex justify="center" align="center" className="h-screen">
      <Fieldset
        className="max-w-xl w-full p-2"
        legend="Войдите в аккаунт"
        radius="md"
      >
        <Login />
      </Fieldset>
      <div className="absolute top-0 right-0 p-4">
        <SwitchTheme />
      </div>
    </Flex>
  );
};
