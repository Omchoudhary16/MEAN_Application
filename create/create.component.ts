import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      let id = res['id'];
      if(id !== undefined){
        this.userService.GetUser(id).subscribe(res => {
          this.user = res;
        });
      }
    });
  }

  SaveData(form: NgForm){
    if(form.valid){
      if(this.user._id !== undefined){
        this.userService.UpdateUser(this.user).subscribe(res => {
          if(res.status == 200){
            this.router.navigate(['/']);
          }
        })
      }else{
        this.userService.AddUser(this.user).subscribe(res => {
          if(res.status == 201){
            this.router.navigate(['/']);
          }
        });
      } 
    }
  }
}
