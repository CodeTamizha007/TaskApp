import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit,OnDestroy{
  
  errorMessage!:string;

  constructor(private userService: UserService,private router:Router){
    
  }

  ngOnInit(){
     this.errorMessage= this.userService.errorMessage;
     if(!this.errorMessage){this.router.navigate([""])}
  }

 home():void{
  this.userService.errorMessage='';
  this.router.navigate([""])
 }

  ngOnDestroy(): void {
    this.userService.errorMessage=''
  }

}
