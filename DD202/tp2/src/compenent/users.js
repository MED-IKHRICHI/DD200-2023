import {useEffect, useState} from 'react';
import AddUser from './adduser';

const User = () =>{
    const [users,setUsers]=useState([])
    const [usersSearch,setUsersSearch]=useState([])
    const [showModal, setShowModal] = useState(false)
    const [userIdUpdate, setUserIdUpdate] = useState(null)
    const [search, setSearch] = useState("")
    useEffect(()=> {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://127.0.0.1:3100/", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUsers(result)
                setUsersSearch(result)
            })
            .catch(error => console.log('error', error));
    }, [showModal])

    useEffect(()=> {
        setUsersSearch(users.filter(user => user.nom.indexOf(search)!= -1 ||user.email.indexOf(search)!= -1 ))
    }, [search])

    const deletUser = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          
          fetch("http://127.0.0.1:3100/"+id, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const UpdateUser = (id) => {
        setUserIdUpdate(id)
        setShowModal(true)
    }

    return <> 
        <h1>Users ({usersSearch.length}) </h1>
        <input placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <br />
        <a href='javascript:void(0)' onClick={()=> {setShowModal(true); setUserIdUpdate(null)}}>Add User</a>
        <ul className='list-users'>
            {
                usersSearch.map(user => {
                    return (
                        <li key={user.id}>
                            {user.nom} - {user.email}
                            <span onClick={()=>UpdateUser(user.id)} style={{"color": 'green'}}>Update</span>
                            <span onClick={()=>deletUser(user.id)} style={{"color": 'red'}}>Delete</span>
                        </li>
                    )
                })
            }
        </ul>
        {
            (showModal) && <AddUser showModal = {setShowModal} userId= {userIdUpdate} />
        }
    </>
}
export default User;