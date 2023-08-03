import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { RespuestaApi } from '../interfaces/respuesta-api.interface';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'https://peticiones.online/api/users';
  constructor() {}

  async GetAll(pagina?: number): Promise<User[]> {
    let paginacion: string = this.baseUrl;
    if (pagina != undefined && pagina > 1) {
      paginacion += '?page=' + pagina;
    }
    console.log(paginacion);
    return (await lastValueFrom(this.httpClient.get<RespuestaApi>(paginacion)))
      .results;
  }

  async GetAllUsersInfoPaginado(): Promise<RespuestaApi> {
    return await lastValueFrom(this.httpClient.get<RespuestaApi>(this.baseUrl));
  }

  async GetUserById(id: string): Promise<User> {
    return await lastValueFrom(
      this.httpClient.get<User>(this.baseUrl + '/' + id)
    );
  }

  async EliminarUser(id: string): Promise<User> {
    return await lastValueFrom(
      this.httpClient.delete<User>(this.baseUrl + '/' + id)
    );
  }
}
