import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export const SwitchTheme = () => {
     const { setColorScheme } = useMantineColorScheme();
     const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

     return (
          <ActionIcon
               onClick={() => setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')}
               variant="default"
               size="xl"
               aria-label="Toggle color scheme"
          >
               {computedColorScheme === 'light' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
          </ActionIcon>
     );
}