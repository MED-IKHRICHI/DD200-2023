
import {useEffect , useState} from "react"
import AddUser from "./addUser";
const Users = ({reloadData}) => {
    const [idUser, setIdUser] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const updateUser = (id) => {
        setIdUser(id)
        setShowForm(true)
    }
    const deleteUser = (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
          
        fetch("http://127.0.0.1:3030/"+id, requestOptions)
            .then(response => response.json())
            .then(result => setDataUsers(result)) 
            .catch(error => console.log('error', error));
    }
    const getData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://127.0.0.1:3030/", requestOptions)
            .then(response => response.json())
            .then(result => setDataUsers(result)) 
            .catch(error => console.log('error', error));
    }
    const [dataUsers  , setDataUsers ] = useState([])
    useEffect(() => {
        getData()
    } , [reloadData, showForm])
    return (
        <>
            <div>Users ({dataUsers.length})</div>
            <ul>
                {dataUsers.map((user) => {
                    return (
                        <li  className="user" key={user.id}>
                            {user.name} {user.prenom}
                            <span onClick={()=> updateUser(user.id)}>&nbsp; Update</span>
                            <span onClick={()=> deleteUser(user.id)}>&nbsp; Remove</span>
                        </li>
                    )
                })}
            </ul>
            {
                (showForm) && <AddUser userId = {idUser} setShowForm = {setShowForm} />
            }
        </>
    )
}

export default Users;