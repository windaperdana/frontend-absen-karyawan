import React, { useState } from 'react';
// import axios from 'axios';
import { setUserSession } from './Utils/Common';
import HttpService from "./services/http.service";
import Dashboard from "./components/dashboard.component";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Login(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    
    
    const handleLogin = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        formData.append("email", email.value);
        formData.append("password",password.value);
        HttpService.login_karyawan(formData).then(response => {
            console.log(response.data);
            setLoading(false);
            setUserSession(response.data.token, response.data.email, response.data.role_login);
            props.history.push(Dashboard);
        }).catch(error => {
            setLoading(false);
            console.log(error)
            if (error.response.status === 422) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    };

    return (
        <div>
            <h2>Login Karyawan</h2><br /><br />
        <div>
            Email<br />
            <input type="text" {...email} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
            Password<br />
            <input type="password" {...password} autoComplete="new-password" />
        </div>
        <br />
        <div style={{ marginTop: 10 }}>
          <input type="file" name="uploaded_image" onChange={saveFile} />
         
        </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <button value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>LOGIN</button>
            {/* <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br /> */}
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;