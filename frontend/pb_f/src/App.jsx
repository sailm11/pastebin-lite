import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
  
}

export default App
