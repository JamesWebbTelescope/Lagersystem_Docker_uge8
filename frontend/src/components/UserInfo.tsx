import { useState, useEffect } from 'react';
import { getToken, clearToken } from '../authService';
import type { AdminUser } from '../types/Types';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
    const [user, setUser] = useState<AdminUser|null>(null);
    const API_URL = import.meta.env.VITE_API_URL;
    const token = getToken()    
    const navigate = useNavigate();
    const getUser = async () => {
        
        if (!token) {
            console.warn("No token found. Redirecting to login...");
            clearToken();    
            navigate("/admin");          
            return;
        }

        try {
        const res = await fetch(`${API_URL}/api/auth/profile/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });        
        
        if (!res.ok) {
            if (res.status === 401) {
                // Token is invalid or expired
                console.warn("Token expired or invalid. Clearing and redirecting...");
                clearToken();
                navigate("/admin");  
            }
            throw new Error(`Request failed with status ${res.status}`);
        }

        const data: AdminUser = await res.json()
        console.log(data)
        setUser(data)
        }
        catch(error){
            console.error("User info error:", error);
        }
    }

    useEffect(() => {
      getUser()    
    }, []);

    return (
        <div>
            <h3>User Info</h3>
            <span>ID:</span> <span>{user?.id}</span> <br/>
            <span>Name:</span> <span>{user?.name}</span> <br/>           
            <button onClick={() => {
               
                clearToken();
                window.location.href = "/admin";
            }}>Logout</button>
        </div>
    )}