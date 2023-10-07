import { useEffect, useState } from "react"

const AddUser=({showModal, userId})=>{
    const [user, setUser] = useState({
        nom: "",
        email: ""
    })
    useEffect(()=> {
        if(userId) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch("http://127.0.0.1:3100/"+userId, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setUser(result) 
                })
                .catch(error => console.log('error', error));
        }
    }, [])
 
    const onSubmit = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(user);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        if(userId) {
            requestOptions.method = 'PUT'
            fetch("http://127.0.0.1:3100/"+userId, requestOptions)
            .then(response => response.json())
            .then(result =>showModal(false))
            .catch(error => console.log('error', error));
        } else {
            fetch("http://127.0.0.1:3100/", requestOptions)
            .then(response => response.json())
            .then(result => showModal(false))
            .catch(error => console.log('error', error));
        }
    }
    return <>
        <div id="lightbox">
            <form onSubmit={onSubmit}>
                <span onClick={()=> showModal(false)}>Close</span>
            <div>
                <label for="name">Nom</label>
                <input type="text" name="nom" id="name" onChange={(e) => setUser({...user,nom:e.target.value})} value={user.nom}/>
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setUser({...user,email:e.target.value})} value={user.email}/>
            </div>
            <div>
            <input type="submit"/>  
            </div>

        </form>
        </div>
    </>
}
export default AddUser;