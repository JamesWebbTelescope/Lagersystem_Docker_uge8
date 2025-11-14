
import { useState, useEffect } from 'react';
import { getToken, clearToken } from '../authService';
import type { AdminUser } from '../types/Types';
import { useNavigate } from 'react-router-dom';


export default function UserList() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const [token, setTokenState] = useState<string | null>(getToken());   
    const navigate = useNavigate();


    const getUsers = async () => {
        

        if (!token) {
            console.warn("No token found. Redirecting to login...");
            clearToken();    
            setTokenState(null);
            navigate("/admin");        
        }

        try {
        const res = await fetch(`${API_URL}/api/auth/profile/`, {
          method: "GET",
          headers: {         
            "Authorization": `Bearer ${token}`,
          },
        });        
        
        if (!res.ok) {
            if (res.status === 401) {
                // Token is invalid or expired
                console.warn("Token expired or invalid. Clearing and redirecting...");
                clearToken();
                setTokenState(null);
                navigate("/admin");        
                return;
            }
            throw new Error(`Request failed with status ${res.status}`);
        }

        const data: AdminUser[] = await res.json()
        console.log(typeof(data))
        setUsers(data)
        }
        catch(error){
            console.error("User info error:", error);
        }
    }

    useEffect(() => {
      getUsers()    
    }, []);

    return (
        <div>
            <h3>All Users</h3>
            
            {(users && Array.isArray(users) )&& (
            <ul>
                {users.map(user => (
                <li key={user.id}>
                    [{user.id}]: <strong>{user.name}</strong>
                </li>
                ))}
            </ul>
            )}

        </div>
    )
}