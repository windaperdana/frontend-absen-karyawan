import React from 'react';
import { getUser, getToken, removeUserSession } from '../Utils/Common';
import HttpService from "../services/http.service";
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";


export default class DashboardKaryawan extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            datas: {
                nama_karyawan: "",
                date_login:"",
                role_login:""
            },
            listKaryawans:[]
        };
    }
  
    componentDidMount() {
        const token = getToken();
        if (!token) {
            return;
        }
        const AuthStr = 'Bearer '+token; 
        axios.get(`http://localhost:3002/api/getuser`,{headers :{ 'Authorization': AuthStr }}).then(response => {
            console.log("DASH ==>",response.data)
            this.setState({
                datas: response.data
            });
        }).catch(error => {
            console.log(error)
        });
        this.retrieveListKaryawan();
    }
    handleLogout = () => {
        var user = getUser();
        var data = {
            email: user
        };
    
        HttpService.logout_karyawan(data).then(response => {
            console.log(response.data);
            removeUserSession();
            this.props.history.push('/login');
        }).catch(error => {
            console.log(error)
        });
    }

    retrieveListKaryawan = () => {
        HttpService.get_karyawan().then(response => {
            console.log("LIST KARYAWAN ==>",response.data.listkaryawan);
            this.setState({
                listKaryawans: response.data.listkaryawan
            });
        }).catch(e => {
            console.log(e);
        });
    }
  
    render() {
        const { datas, listKaryawans } = this.state;

        return (
            <div>
            { datas.role_login === "karyawan" ? (
                <div>
                    Welcome {datas.nama_karyawan}!<br /><br />
                    Time Login { moment(datas.date_login).format('YYYY-MM-DD HH:mm:ss')  } <br /><br />
                    <input type="button" onClick={this.handleLogout} value="Logout" />
                </div>
            ) : (
                <div>
                    Welcome {datas.nama_karyawan}!<br /><br />
                    <Link to="/add" className="button is-primary mt-2">Add New</Link>
                    <table className="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIK</th>
                                <th>Nama Karyawan</th>
                                <th>No Tlp</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { listKaryawans.map((rowKaryawan, index) => (
                                <tr key={ rowKaryawan.id }>
                                    <td>{ index + 1 }</td>
                                    <td>{ rowKaryawan.nik }</td>
                                    <td>{ rowKaryawan.nama_karyawan }</td>
                                    <td>{ rowKaryawan.no_tlp }</td>
                                    <td>
                                        <Link to={`/edit/${rowKaryawan.id}`} className="button is-small is-info">Edit</Link>
                                        {/* <button onClick={ () => deleteProduct(rowKaryawan.id) } className="button is-small is-danger">Delete</button> */}
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                    <input type="button" onClick={this.handleLogout} value="Logout" />
                </div>
                
            )}
            </div>
        )
    }
}