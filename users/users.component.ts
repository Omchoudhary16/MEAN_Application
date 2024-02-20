import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit{

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.GetUsers().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(id: string){
    if(confirm('Are you sure to delete ?')){
      this.userService.DeleteUser(id).subscribe(res => {
        if(res.status === 200){
          for(let i = 0; i < this.users.length; i++){
            if(id === this.users[i]._id){
              this.users.splice(i, 1);
              break;
            }
          }
        }
      })
    }
  }

}
