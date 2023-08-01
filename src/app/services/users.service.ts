import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  
  private baseUrl:string= 'https://peticiones.online/api/users ';
  constructor() { }

GetAll():Promise<User[]>{
  return lastValueFrom(this.httpClient.get<User[]>(this.baseUrl))
}

}
