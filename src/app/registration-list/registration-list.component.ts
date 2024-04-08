import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.scss'
})
export class RegistrationListComponent implements OnInit {
  dataSource: MatTableDataSource<User> | any;
  users!: User[] | any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'weight',
    'height',
    'bmi',
    'bmiResult',
    'gender',
    'requireTrainer',
    'package',
    'important',
    'haveClubBefore',
    'enquiryDate',
    'actions'
  ];
  
  constructor(private api: ApiService, private router: Router, private confirmService: NgConfirmService, private toastService: NgToastService) { }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.api.getRegistration().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number){
    this.router.navigate(['update', id])
  }

  deleteUser(id: any){
    this.confirmService.showConfirm("Are you sure you want to delete?", () => {
      this.api.deleteRegistration(id).subscribe(res =>{
        this.toastService.success({detail:"Success",summary:"Deleted Successfully",duration:3000});
        this.getUsers();
      })
    },
    () => {
      
    })
  }
}
