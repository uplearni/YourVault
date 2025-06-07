
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { Dashboard} from "./pages/Dashboard"

function App() {
 

  return (
    <>
    
     <ThemeProvider theme={theme}>
     <Dashboard></Dashboard>
     </ThemeProvider>
    </>
  )
}

export default App
