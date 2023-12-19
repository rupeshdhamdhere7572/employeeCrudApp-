import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dash board.model';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  empData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(public _service: ApiService, private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this._service.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('employee added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();  
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  getAllEmployee() {
    this._service.getEmployee().subscribe((res) => {
      this.empData = res;
    });
  }

  deleteEmp(item: any) {
    this._service.deleteEmployee(item.id).subscribe((res) => {
      alert(' Employee Deleted Successfully');
      this.getAllEmployee();
    });
  }
  onEdit(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = item.id;
    this.formValue.controls['firstName'].setValue(item.firstName);
    this.formValue.controls['lastName'].setValue(item.lastName);
    this.formValue.controls['email'].setValue(item.email);
    this.formValue.controls['mobile'].setValue(item.mobile);
    this.formValue.controls['salary'].setValue(item.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this._service
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Updated Sucessfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
