import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from './page/Game.tsx';
import Home from './page/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ChakraProvider>
    <Router>
      <Routes> 
      <Route path='/' element={<Home />} /> 
      <Route path='/Game' element={<Game />} /> 
      </Routes>
    </Router>
  </ChakraProvider>
  </StrictMode>
)
