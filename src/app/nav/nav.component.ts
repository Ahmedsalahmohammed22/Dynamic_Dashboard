import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchTerm!: number;
  constructor(private userService : UsersService , private toastr : ToastrService) {
    console.log(this.searchTerm)
   }

  ngOnInit(): void {
  }
  search(){
    this.userService.changeSearchTerm(this.searchTerm);
  }
}
