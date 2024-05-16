import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user : User = {} as User;
  id : number | undefined
  constructor(private userService : UsersService , private route : ActivatedRoute , private toastr : ToastrService , private router : Router) {
    this.route.params.subscribe(params => {
      this.id = +params['userid']; 
    });
    console.log(typeof( this.id))
   }

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(){
    console.log(this.id)
    if(!this.id) return;
    this.userService.getUser(this.id).subscribe({
      next : User =>{ 
        if(User.data){
          this.user = User.data
        }else{
          this.user = User
        }
        console.log(User)
        console.log(this.user)

      },
      error:_=>{
        this.router.navigateByUrl('/users');
        this.toastr.error('User Details failed ');
      }
    })
  }

}
