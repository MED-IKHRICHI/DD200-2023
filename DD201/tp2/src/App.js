import logo from './logo.svg';
import './App.css';
import Users from './users';
import AddUser from './addUser';
import { useState } from 'react';

function App() {
  const [reloadData, setreloadData] = useState(false)
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="App">
      <h1>La listes des stagiaires</h1>
      <a href='javascript:void(0)' onClick={()=> setShowForm(true)} >Add new User</a>
      <Users reloadData= {showForm}/>
      { (showForm) && <AddUser setShowForm= {setShowForm}  />}
    </div>
  );
}

export default App;
