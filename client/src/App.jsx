
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { Room } from "./pages/Room"

function App() {
 

  return (
    <>
    
     <ThemeProvider theme={theme}>
     <Room></Room>
     </ThemeProvider>
    </>
  )
}

export default App
