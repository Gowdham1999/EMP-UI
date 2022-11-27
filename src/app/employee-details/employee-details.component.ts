import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendDataFetchService } from '../services/backend-data-fetch.service';



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})

export class EmployeeDetailsComponent implements OnInit {

  constructor(private backendDataService: BackendDataFetchService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  selectedEmployeeId = ''

  Element_Data: any = [];
  dataSource = new MatTableDataSource<any>(this.Element_Data);
  displayedColumns: string[] = ['id', 'empID', 'empName', 'companyName', 'empEmail', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngOnInit(): void {

    //!Get All Employees from Backend
    this.getAllEmployeeDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllEmployeeDetails() {
    this.backendDataService.fetchEmployeeDetailsFromBackend().subscribe(data => {

      this.Element_Data = data;
      this.dataSource = new MatTableDataSource<any>(this.Element_Data)
    })
  }

  addNewEmployee(){

    this.backendDataService.createService = true;
    this.backendDataService.updateService = false;
    this.router.navigate(['-1'], { relativeTo: this.activatedRoute })
  }

  onUpdate(event: Event | any) {
    // console.log(event.path[5].firstElementChild.nextSibling.innerText);

    this.selectedEmployeeId = event.path[5].firstElementChild.innerText
    this.backendDataService.selectedEmployeeIDForUpdate = this.selectedEmployeeId
    this.backendDataService.updateService = true
    this.backendDataService.createService = false;
    this.router.navigate([this.selectedEmployeeId], { relativeTo: this.activatedRoute })
  }

  onDelete(event: Event | any) {
    // console.log(event.path[5].firstElementChild.innerText);
    // console.log(event.path[5].firstElementChild.nextSibling.innerText);

    //! Delete Employee by ID
    this.backendDataService.deleteEmployeeDetailByID(Number(event.path[5].firstElementChild.innerText)).subscribe(data => {
      this.getAllEmployeeDetails();
      this._snackBar.open(`Successfully Deleted ${event.path[5].firstElementChild.nextSibling.innerText}`, "Ok", { duration: 1500 });
    })
  }

}

export class EmployeeDetails {
  constructor(id: string,
    empID: string | any,
    empName: string  | any,
    companyName: string | any,
    empEmail: string | any) { }
}
