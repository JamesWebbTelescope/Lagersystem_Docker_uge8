import { useState,  } from 'react';
import { getToken, setToken, clearToken } from '../authService';
import { useNavigate } from 'react-router-dom';




export default function RegisterForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [token, setTokenState] = useState<string | null>(getToken());
    const API_URL = import.meta.env.VITE_API_URL;    
    const navigate = useNavigate();

    const sendRegister = async () => {

        if (!token) {
            console.warn("No token found. Redirecting to login...");
            clearToken();   
            setTokenState(null); 
            navigate("/admin");        
        }
      try {
        
        const loginModel = {
            "username": name,
            "password": password
        }        
        const res = await fetch(`${API_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(loginModel),
        });
        
          const data = await res.json();          
          setToken(data.access_token);
          setTokenState(data.access_token);
          navigate("/admin");        
        } catch (error) {
          console.error("Login error:", error);
        }
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendRegister();
    };


    return (
        
        <div>
            <h3>Register New User</h3>
            <form onSubmit={handleSubmit}>
            <label>Username:
            <input
                name="username"
                autoComplete="on"
                placeholder="username"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            </label>
            <br />
            <label>Password:
            <input
                name="password"
                autoComplete="off"
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            </label>
            <br />
            <button>Register</button>
            </form>
        </div>
    )}
