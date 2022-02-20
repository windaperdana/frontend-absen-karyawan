import React, { useState } from 'react';
// import axios from 'axios';
import { setUserSession } from './Utils/Common';
import HttpService from "./services/http.service";
import Dashboard from "./components/dashboard.component";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    var data = {
      email: email.value,
      password: password.value
    };

    HttpService.login_karyawan(data)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setUserSession(response.data.token, response.data.email);
        props.history.push(Dashboard);
      })
      .catch(error => {
        setLoading(false);
        console.log(error)
        if (error.response.status === 422) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Email<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
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