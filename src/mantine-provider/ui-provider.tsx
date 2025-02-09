import React from 'react'
import { createTheme, MantineProvider, useMantineColorScheme } from '@mantine/core'

const UIprovider: React.FC<{ children: React.ReactElement[] | React.ReactElement, type: string }> = ({ children, type }) => {
     const { colorScheme } = useMantineColorScheme();
     
     const theme = createTheme({
          primaryColor: type === 'light' ? "pink" : "indigo",
     });

     return (
          <MantineProvider theme={theme}>
               {children}
          </MantineProvider>
     )
}

export default UIprovider