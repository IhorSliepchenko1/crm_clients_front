import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IoMoonSharp, IoSunny } from "react-icons/io5";

export const SwitchTheme = () => {
     const { setColorScheme } = useMantineColorScheme();
     const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });

     return (
          <ActionIcon
               onClick={() => setColorScheme(computedColorScheme === "dark" ? "light" : "dark")}
               variant="default"
               size="lg"
               aria-label="Toggle color scheme"
          >
               {computedColorScheme === "light" ? <IoSunny /> : <IoMoonSharp />}
          </ActionIcon>
     );
}