import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';
import { RespuestaApi } from 'src/app/interfaces/respuesta-api.interface';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent {
  arrayUsers: User[] = [];
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  numeroPaginas: number = 0;
  arrayPaginas = Array(this.numeroPaginas);
  paginaActual: number = 1;

  async ngOnInit(): Promise<void> {
    let primeraPaginacion: RespuestaApi;
    try {
      primeraPaginacion = await this.usersService.GetAllUsersInfoPaginado();
      this.cargarInfoPaginacion(primeraPaginacion);
      this.arrayUsers = primeraPaginacion.results;
    } catch (error) {Swal.fire({
      icon: 'error',
      title:
        'Error al obteener los usuarios. Consulte con el administrador.',
    });}
  }

  private cargarInfoPaginacion(respuesta: RespuestaApi): void {
    this.numeroPaginas = respuesta.total_pages;
    this.arrayPaginas = Array(this.numeroPaginas);
  }

  async irPagina(pagina: number): Promise<void> {
    try {
      this.paginaActual = pagina;
      this.arrayUsers = await this.usersService.GetAll(pagina);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title:
          'Error al obtener los usuarios. Consulte con el administrador.',
      });
    }
  }

  irAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.irPagina(this.paginaActual);
    }
  }
  irSiguiente() {
    if (this.paginaActual < this.numeroPaginas) {
      this.paginaActual += 1;
      this.irPagina(this.paginaActual);
    }
  }
}
