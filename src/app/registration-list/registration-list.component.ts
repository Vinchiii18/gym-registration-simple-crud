import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';

import { User } from '../models/user.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrl: './registration-list.component.scss'
})
export class RegistrationListComponent implements OnInit{

  public dataSource!:MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender',  'enquiryDate', 'action'];

  constructor(
    private api: ApiService,
    private router: Router,
    private toast: NgToastService

  ) {
    }
  
    ngOnInit() {
      this.getUsers();
    }

    getUsers() { 
      this.api.getRegisteredUser().subscribe(res => { 
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
      }
    }

    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    edit(id: number) {
      this.router.navigate(['update', id])
    }

    delete(id: number) {
      if (window.confirm('Are you sure you want to delete?')) {
        this.api.deleteRegisteredUser(id).subscribe(res => {
          this.toast.success({detail: 'SUCCESS', summary: 'Deleted Successfully!', duration: 3000});
          this.getUsers();
        });
      }
    }

}
