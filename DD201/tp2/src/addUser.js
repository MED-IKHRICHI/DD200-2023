import React,{useEffect, useState} from "react";
const AddUser = ({setShowForm, userId}) => {
    const [user,setUser]=useState({name:"",prenom:""})
    useEffect(()=> {
        if(userId) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://127.0.0.1:3030/"+userId, requestOptions)
            .then(response => response.json())
            .then(result => setUser(result))
            .catch(error => console.log('error', error));
        }
    }, [userId])
    const submitHandler=(e)=>{
        e.preventDefault();
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
            requestOptions.method = "PUT"
            fetch("http://127.0.0.1:3030/"+userId, requestOptions)
            .then(response => response.json())
            .then(result => setShowForm(false))
            .catch(error => console.log('error', error));
        } else {
            fetch("http://127.0.0.1:3030/", requestOptions)
            .then(response => response.json())
            .then(result => setShowForm(false))
            .catch(error => console.log('error', error));
        }
    }
    return (
        <>
            <div id="lightBox">
                <form onSubmit={submitHandler}>
                    <span className="btn-close" onClick={()=> {
                        setShowForm(false)
                    }}>Close</span>
                    <table>
                        <tr>
                            <td>
                                <label>Entre le nom</label>
                            </td>
                            <td>
                                <input type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Entre le prenom</label>
                            </td>
                            <td>
                                <input type="text" value={user.prenom} onChange={(e)=>setUser({...user,prenom:e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Submit"/>
                            </td>
                        </tr>
                    </table>
                    
                </form>
            </div>
        </>
    )
}

export default AddUser;