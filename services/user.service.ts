import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers : HttpHeaders;
  constructor(private client : HttpClient) {
    this.headers = new HttpHeaders({'content-type':'application/json'});
   }
  
  GetUsers() : Observable<User[]>{
    return this.client.get<User[]>(env.apiAddress + '/User');
  }

  GetUser(id:string) : Observable<User>{
    return this.client.get<User>(env.apiAddress + '/User/' + id);
  }

  AddUser(user: User) : Observable<HttpResponse<any>>{
    return this.client.post(env.apiAddress + '/User/', JSON.stringify(user), {
      headers: this.headers, observe: 'response' 
    });
  }

  UpdateUser(user: User) : Observable<HttpResponse<any>>{
    return this.client.put(env.apiAddress + '/User/' + user._id, JSON.stringify(user), {
      headers: this.headers, observe: 'response' 
    });
  }

  DeleteUser(id: string) : Observable<HttpResponse<any>>{
    return this.client.delete<HttpResponse<any>>(env.apiAddress + '/User/' + id, {
      observe: 'response' 
    });
  }
}
