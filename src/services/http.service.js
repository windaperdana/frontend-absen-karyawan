import http from "../http-common";

class TutorialDataService {
//   getAll() {
//     return http.get("/getkaryawan");
//   }

  get_karyawan(data) {
    return http.get("/getkaryawan", data);
  }

  login_karyawan(data) {
    return http.post("/login_karyawan", data);
  }

  logout_karyawan(data) {
    return http.post("/logout_karyawan", data);
  }

  insert_karyawan(data){
    return http.post("/register_karyawan", data);
  }

}

export default new TutorialDataService();