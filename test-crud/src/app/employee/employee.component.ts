import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeModel: EmployeeModel = new EmployeeModel();

  formValue !: FormGroup;

  employeeData: any;

  constructor(private fromBuilder: FormBuilder, private api: ApiService) {

  }
  ngOnInit(): void {
    this.formValue = this.fromBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      cell: [''],
      salary: ['']

    })

    this.getAllEmployee();

  }

  postEmployeeDetails() {
    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.cell = this.formValue.value.cell;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModel)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added")
        this.formValue.reset();
        this.getAllEmployee();
      },
        err => {
          alert("Data Not Daved")
        }

      )
  }

  getAllEmployee() {

    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })

  }

  deleteEmployee(row: any) {

    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        console.log(res);
        alert("Employee Deleted")

        this.getAllEmployee();
      },
        err => {
          alert("Data Not Daved")
        }

      )
  }


  onEdite(row: any) {
    this.employeeModel.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['cell'].setValue(row.cell);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  updateEmployeeDetails() {

    this.employeeModel.firstName = this.formValue.value.firstName;
    this.employeeModel.lastName = this.formValue.value.lastName;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.cell = this.formValue.value.cell;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModel, this.employeeModel.id)

    .subscribe(res => {
      console.log(res);
      alert("Employee Updated")
      
      this.getAllEmployee();
    },
      err => {
        alert("Data Not Daved")
      }

    )

  }


}
