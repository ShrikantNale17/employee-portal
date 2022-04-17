import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListOfEmployees from './components/ListOfEmployees';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={'/employees'} />}></Route>
          <Route path='/employees' element={<ListOfEmployees />}></Route>
          <Route path='/employees/add' element={<AddEmployee />}></Route>
          <Route path='/employees/update' element={<UpdateEmployee />}></Route>

          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
