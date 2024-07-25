import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Layout } from './component/Layout';
import Login from './pages/Login';

function App() {

  const token = true;
  const loginRoute = (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Login/>} />
      <Route path="*" element={<Login/>} />
    </Routes>
  )

  return (
    <BrowserRouter>
      {token ?
        <>
          <Layout/>
        </>
        :
        loginRoute}
    </BrowserRouter>
  );
}

export default App;