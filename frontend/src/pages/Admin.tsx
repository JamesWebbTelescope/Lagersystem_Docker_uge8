import Layout from "../components/Layout";
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register";
import UserInfo from "../components/UserInfo";
import UserList from "../components/UserList";
import { getToken } from '../authService';

export default function AdminPage() {

    const token = getToken()


    return (
        <Layout>
         
            
        {token ? (
        <div>
            <UserInfo/>
            <RegisterForm/>
            <UserList/>
        </div>
        ) : (
        <LoginForm/>
        )}

            
        </Layout>
    );
}