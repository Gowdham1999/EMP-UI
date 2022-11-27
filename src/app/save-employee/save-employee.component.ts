import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendDataFetchService } from '../services/backend-data-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.scss']
})
export class SaveEmployeeComponent implements OnInit {

  constructor(private backendDataService: BackendDataFetchService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,) { }

  saveEmployeeForm!: FormGroup

  buttonName = ''

  ngOnInit(): void {

    if (this.backendDataService.updateService === true) {
      this.buttonName = 'Update'
      this.getEmployeeById().subscribe(data => {
        console.log(data)

        this.saveEmployeeForm = this.formBuilder.group({
          'id': data.id,
          'empID': [data.empID, Validators.required],
          'empName': [data.empName, Validators.required],
          'empEmail': [data.empEmail, Validators.required],
          'companyName': [data.companyName, Validators.required]
        })

      })
    }

    else {
      this.buttonName = 'Add';
      this.saveEmployeeForm = this.formBuilder.group({
        'id': null,
        'empID': [null, Validators.required],
        'empName': [null, Validators.required],
        'empEmail': [null, Validators.required],
        'companyName': [null, Validators.required]
      })
    }

    // this.saveEmployeeForm = this.formBuilder.group({
    //   'empID': [null, Validators.required],
    //   'empName': [null, Validators.required],
    //   'empEmail': [null, Validators.required],
    //   'companyName': [null, Validators.required]
    // })

  }

  getEmployeeById() {
    return this.backendDataService.fetchEmployeeDetailById(Number(this.backendDataService.selectedEmployeeIDForUpdate))
  }

  onSubmit() {

    if (this.backendDataService.updateService === true) {
      this.backendDataService.updateEmployeeDetailByID(Number(this.backendDataService.selectedEmployeeIDForUpdate),
        this.saveEmployeeForm.value)
        .subscribe(data => {
          console.log(data)
          this._snackBar.open("Details modified successfully!", "", { duration: 1300 })
          this.backendDataService.updateService = false;
          this.router.navigate(['home/employees'])
        })
    }
    else {
      this.backendDataService.addEmployeeDetails(this.saveEmployeeForm.value).subscribe(data => {
        console.log(data);

        this._snackBar.open("Details added successfully!", "", { duration: 1300 })
        this.backendDataService.createService = false;
        this.router.navigate(['home/employees'])
      })
    }
  }

}
