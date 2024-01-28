import axios from "axios"
import { useEffect, useState } from "react"


export default function AdminUsers() {
    const url = 'http://localhost:4000'
    const [user,setUser] = useState([])

    const getUsers = async () => {
        try{
            const response = await axios.get(`${url}/get-users`,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            setUser(response.data)
            if(response.status === 200){
                console.log('Ok')
            }else{
                console.log('Error to get data')
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    },[])
    // console.log(user)

    return (
        <div>
            {user && (
                <div>
                    {user.map((user) => (
                        <div key={user._id} className=" flex gap-3 mb-4 p-4 bg-gray-100 rounded-md">
                            <div>
                                <img src={url+'/'+user.photo} alt={user.firstName} className="w-24 h-24 rounded-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName} <span className="text-sm">({user._id})</span></h2>
                                
                                <p className="text-purple-800">{`Number: ${user.number}`}</p>
                                <p className="text-green-800">{`Email: ${user.email}`}</p>
                                <p className="text-yellow-800">{`Admin: ${user.isAdmin ? 'Yes' : 'No'}`}</p>
                            </div>
                        </div>
                      
                    ))
                    }
                    
                </div>
            )}
        {!user && (
            <div>
                <h1 className="text-2xl mb-4">No User Found</h1>
            </div>
        )}
        </div>
    )
    }