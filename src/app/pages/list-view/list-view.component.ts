import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';
import { RespuestaApi } from 'src/app/interfaces/respuesta-api.interface';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent {
  arrayUsers: User[] = [];
  usersService = inject(UsersService);
  numeroPaginas:number = 0;
  paginaActual:number = 1;

  async ngOnInit(): Promise<void> {
    let primeraPaginacion: RespuestaApi;
    try {
      primeraPaginacion = await this.usersService.GetAllUsersInfoPaginado();
      this.cargarInfoPaginacion(primeraPaginacion);
      this.arrayUsers = primeraPaginacion.results;
    } catch (error) {
      console.log(error);
    }
  }

  private cargarInfoPaginacion(respuesta:RespuestaApi):void{
    this.numeroPaginas = respuesta.total_pages;
  }

  async pagina():Promise<void>{
    try {
      this.arrayUsers = await this.usersService.GetAll(2);
    } catch (error) {
      console.log(error);
    }
  }
}
