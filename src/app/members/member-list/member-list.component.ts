import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users : User[] = [];
  pagination : Pagination|undefined;
  userParams : UserParams | undefined; 
  searchTerm: number | null | undefined;;
  constructor(private userService : UsersService , private toastr :ToastrService , private router : Router) {
    this.userParams = this.userService.getUserParams()
    console.log(this.userParams)
   }

  ngOnInit(): void {
    this.userService.currentSearchTerm.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      if (this.searchTerm) {
        this.searchUserById(this.searchTerm);
      } else{
        this.loadUsers();
      }
    });
  }

  loadUsers(){
    if(this.userParams){
      this.userService.setUserParams(this.userParams)
      this.userService.getUsers(this.userParams).subscribe({
        next: response =>{
          if(response.result && response.pagination){
            this.users = response.result;
            this.pagination = response.pagination
          }else{
            this.toastr.error('Users show failed');

          }
        },
        error: _ =>{
          this.toastr.error('Users show failed');
        }
      })
    }
  }

  pageChanged(event : any){
    if(this.userParams && this.userParams?.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.userService.setUserParams(this.userParams)
      this.loadUsers();
    }
  }

  searchUserById(userId: number): void {
    this.userService.getUser(userId).subscribe({
      next : user =>{
        if(user){
          this.users = [user],
          this.toastr.success('User found successfully');
        }else{
          this.users = [];
          console.log(this.users.length)
          this.toastr.success('Users found successfully');
        }
      },
      error : _ =>{
        this.router.navigateByUrl('/users');
        this.users = [];
        console.log(this.users.length)
        this.toastr.error('Users show failed');
        
      }
    }) 

  }

}
