import logo from './logo.svg';
import './App.css';

import { useRoutes } from 'react-router-dom';
import { routes } from './route'; 
function App() {
  const route = useRoutes(routes);
  return (
    <>
     
        {route}
    
    </>
  );
}

export default App;
