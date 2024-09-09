import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user-interface';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent   {
  user!: User;
  userId!: number;
  loading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.loading = true;
      this.userId = param['id'];
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data.data;
        this.loading = false;
      })
    });
   
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
