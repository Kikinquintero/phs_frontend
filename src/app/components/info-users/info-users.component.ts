import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { TypeUsers, User } from 'src/app/interfaces/typeUsers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

/** Constants used to fill up our data base. */


@Component({
  selector: 'app-info-users',
  templateUrl: './info-users.component.html',
  styleUrls: ['./info-users.component.css']
})
export class InfoUsersComponent implements OnInit,AfterViewInit {

//  typeUsers  : TypeUsers [];
  typeUsers : User[];

  displayedColumns: string[] = ['id','nombre', 'apellido', 'email','activo'];
  // dataSource: MatTableDataSource<User>;
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private _formBuilder: FormBuilder
  ) {
    // Create 100 users
    // const users = Array.from({length: 20}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  isChecked  : any;
  formGroup = this._formBuilder.group({
    activar: '',
  });


  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value));
  }





  ngOnInit(): void {

      // this.adminService.getAllTypeUsers()

      this.adminService.getAllTypeUsers().subscribe((data:TypeUsers[]) => {
        // this.UserProfile = data;
        this.typeUsers = data['data'];

        if (data['data']['activo']==1) {
            // this.isChecked = true;
        }
        else{
            // this.isChecked = false;
        }

        this.dataSource = new MatTableDataSource<User>(this.typeUsers);
        this.dataSource.paginator = this.paginator;
        console.log(this.typeUsers);
      })

  }


  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  updateStatusAccount(id, activo){
    // alert(id, activo);
    console.log(id+' ,'+ activo);
  }


}


/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }