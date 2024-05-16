import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserParams } from '../models/userParams';
import { BehaviorSubject, map, of } from 'rxjs';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users:User[]=[];
  baseUrl = environment.apiUrl;
  userCache = new Map();
  userParams : UserParams | undefined;
  private searchSource = new BehaviorSubject<number|null>(null);
  currentSearchTerm = this.searchSource.asObservable();
  constructor(private http : HttpClient) {
    this.userParams = new UserParams()
   }

  getUsers(UserParams : UserParams){
    const response = this.userCache.get(Object.values(UserParams).join('-'));
    console.log(response);
    if(response) return of(response);
    let params = getPaginationHeaders(UserParams.pageNumber)

    return getPaginatedResult<User[]>(this.baseUrl + 'users' , params , this.http).pipe(
      map(response => {
        this.userCache.set(Object.values(UserParams).join('-') , response);
        return response;
      })
    )
  }

  getUser(userid : number){
    const user = [...this.userCache.values()]
    .reduce((arr , elem) => arr.concat(elem.result),[])
    .find((user : User) => user.id === userid)
    console.log(user)
    if(user) return of(user);
    return this.http.get<User>(this.baseUrl + 'users/' + userid)
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params : UserParams){
    this.userParams = params
  }

  changeSearchTerm(searchTerm: number) {
    this.searchSource.next(searchTerm);
  }
}
