import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeDetails } from '../employee-details/employee-details.component';

@Injectable({
  providedIn: 'root'
})
export class BackendDataFetchService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:8080/home/'
  // apiUrlJpa = 'http://localhost:8080/jpa/home/'

  selectedEmployeeIDForUpdate = ''
  updateService = false
  createService = false


  fetchEmployeeDetailsFromBackend() {

    console.log(this.apiUrl + `${sessionStorage.getItem('userName')}/employees`)
    // console.log(basicAuth)

    return this.http.get<EmployeeDetails[]>(this.apiUrl + `${sessionStorage.getItem('userName')}/employees`)

  }

  deleteEmployeeDetailByID(id: number) {

    console.log(this.apiUrl + `${sessionStorage.getItem('userName')}/employees/${id}`)

    return this.http.delete<any>(this.apiUrl + `${sessionStorage.getItem('userName')}/employees/${id}`)

  }

  fetchEmployeeDetailById(id: number) {

    console.log(this.apiUrl + `${sessionStorage.getItem('userName')}/employees/${id}`)

    return this.http.get<EmployeeDetails | any>(this.apiUrl + `${sessionStorage.getItem('userName')}/employees/${id}`)

  }

  updateEmployeeDetailByID(id: number, body: EmployeeDetails) {
    return this.http.put<EmployeeDetails | any>(this.apiUrl + `${sessionStorage.getItem('userName')}/employees/${id}`, body)
  }

  addEmployeeDetails(body: EmployeeDetails) {
    return this.http.post<EmployeeDetails | any>(this.apiUrl + `${sessionStorage.getItem('userName')}/employees`, body)
  }

}
