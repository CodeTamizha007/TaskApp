import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User, UserResponse } from 'src/app/user-interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  response!: any;
  list:any
  users: User[] = [];
  currentPage: number = 1;
  loading = true;

  constructor(private userService: UserService, private router:Router) {
    this.loading=true;
  }

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.loading=true;
    
    this.userService.getUsers(page).subscribe(data => {
      this.response=data;
      this.list=Array(data.total_pages)
      this.users = data.data;
      this.currentPage = page;
      this.loading = false;
    });
    
  }

  viewUserDetail(id: number): void {
    this.userService.getUserById(id).subscribe(() => {
      this.router.navigate(['/user', id]);
    });
  }

}
