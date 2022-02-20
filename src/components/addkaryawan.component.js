import React from 'react';
import HttpService from "../services/http.service";
 
export default class AddKaryawan extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeNik = this.onChangeNik.bind(this);
        this.onChangeNamaKaryawan = this.onChangeNamaKaryawan.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNoTlp = this.onChangeNoTlp.bind(this);
        this.onChangeRoleLogin = this.onChangeRoleLogin.bind(this);
        this.saveKaryawan = this.saveKaryawan.bind(this);

        this.state = {
            nik :"",
            nama_karyawan:"",
            email:"",
            no_tlp:"",
            role_login:"",
            message: ""
        }
    }

    onChangeNik(e){
        this.setState({
            nik: e.target.value
        });
    }
    onChangeNamaKaryawan(e){
        this.setState({
            nama_karyawan: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    onChangeNoTlp(e){
        this.setState({
            no_tlp: e.target.value
        })
    }
    onChangeRoleLogin(e){
        this.setState({
            role_login :e.target.value
        });
    }

    saveKaryawan() {
        var data = {
            nik : Number(this.state.nik),
            nama_karyawan: this.state.nama_karyawan,
            email: this.state.email,
            no_tlp: this.state.no_tlp,
            role_login: this.state.role_login
        }
        console.log("REQ INSERT KARYAWAN ==>",data);

        HttpService.insert_karyawan(data).then(response => {
            console.log("RESPON INSERT KARYAWAN ==>",response);
            // this.setState({
            //     nik : this.state.nik,
            //     nama_karyawan: this.state.nama_karyawan,
            //     email: this.state.email,
            //     no_tlp: this.state.no_tlp,
            //     role_login: this.state.role_login
            // })
            this.props.history.push('/dashboard');
        }).catch(e => {
            console.log(e);
            this.setState({message: e.response});
        });
    }

    render() {
        return (
            <div>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            <th><label htmlFor="nik">NIK</label></th>
                            <th>
                                <input 
                                    className="form-control"
                                    id="nik"
                                    type="number"
                                    placeholder="Nik"
                                    value={this.state.nik}
                                    onChange={this.onChangeNik}
                                    name="nik"
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>NAMA KARYAWAN</th>
                            <th>
                                <input 
                                    className="form-control"
                                    id="nama_karyawan"
                                    type="text"
                                    placeholder="Nama Karyawan"
                                    value={this.state.nama_karyawan}
                                    onChange={this.onChangeNamaKaryawan}
                                    name="nama_karyawan"
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>EMAIL</th>
                            <th>
                                <input 
                                    className="form-control"
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    name="Email"
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                NO TLP
                            </th>
                            <th>
                                <input 
                                    className="form-control"
                                    id="no_tlp"
                                    type="number"
                                    placeholder="No Tlp"
                                    value={this.state.no_tlp}
                                    onChange={this.onChangeNoTlp}
                                    name="no_tlp"
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>
                                ROLE LOGIN
                            </th>
                            <th>
                                <select 
                                    className="form-control"
                                    value={this.state.role_login} 
                                    onChange={this.onChangeRoleLogin} 
                                >
                                    <option value="">-- Role Login-- </option>
                                    <option value="karyawan">Karyawan</option>
                                    <option value="admin_hrd">Admin HRD</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                </table>
                
                <div className="field">
                    <button onClick={this.saveKaryawan} className="btn btn-success">
                        Save
                    </button>
                    <br/>
                    <p>{this.state.message}</p>
                </div>
                
            </div>
        )
    }
    
}