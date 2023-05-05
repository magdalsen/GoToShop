import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './redux/configureStore.ts'

export const theme = {
  fontSizes: {
    l: '45px',
    m: '16px'
  },
  fontWeight: {
    max: "extrabold",
    mid: "medium",
    min: "normal"
  },
}

const fonts = extendTheme({ theme })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={fonts}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
