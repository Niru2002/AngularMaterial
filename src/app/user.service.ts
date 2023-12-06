import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUsers(user:User){
    return this.http.post('https://material-80b89-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json',user);
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>('https://material-80b89-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json');
  }

  deleteUser(key:string){
    return this.http.delete('https://material-80b89-default-rtdb.asia-southeast1.firebasedatabase.app/Users/'+key+'.json');
  }

  updateUser(key:string,user:User){
    return this.http.put('https://material-80b89-default-rtdb.asia-southeast1.firebasedatabase.app/Users/'+key+'.json',user);
  }

}
