import React from 'react'
import { DefaultTheme, ThemeProvider as RNThemeProvider } from 'styled-components'

type Props = {
  children?: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {

  const theme: DefaultTheme = {
    borderRadius: 20,

    error: { background: '#FFE5E6', text: '#FA262A' },

    colors: {
      primary: '#5999fa',

      black: '#000000',
      white: '#ffffff',
    },

    textinputs: {
      background: '#5999fa',
      placeholder: {
        color: '#535AE4',
      },
    },

    buttons: {
      primary: '#000000',
      secondary: '#E5E5E5',
      tertirary: '#4c8ae7',
      label: {
        primary: '#ffffff',
        secondary: '#000000',
        tertirary: '#000000',
      },
    },
  }

  return <RNThemeProvider theme={theme}>{children}</RNThemeProvider>
}

export { DefaultTheme, ThemeProvider }
