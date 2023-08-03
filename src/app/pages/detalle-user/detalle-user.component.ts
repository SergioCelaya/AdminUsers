import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalPortalComponent } from '@sweetalert2/ngx-sweetalert2/lib/swal-portal.component';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-user',
  templateUrl: './detalle-user.component.html',
  styleUrls: ['./detalle-user.component.css'],
})
export class DetalleUserComponent {
  servicioUsers = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  urlImagenDefecto: string = '../../../assets/usuario.png';
 
  usuario: User = {
    _id: '',
    email: '',
    first_name: '',
    id: 0,
    image: '',
    last_name: '',
    password: '',
    username: '',
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = params.idUser;
      if (id != '' || id != undefined) {
        let response = await this.servicioUsers.GetUserById(id);
        if (response._id === undefined) {
          alert('No existe un usuario con el id indicado');
          this.router.navigate(['/home']);
        } else {
          this.usuario = response;
          this.urlImagenDefecto = response.image;
        }
      }
    });
  }

  async eliminarUser(id:string):Promise<void>{
    let response = await this.servicioUsers.EliminarUser(id);
    if(response._id == undefined){
      Swal.fire({icon: 'error',title:'Se ha producido un error al borrar el usuario indicado.'});
    }else{
      Swal.fire({icon: 'success',title:'El usuario ha sido borrado correctamente.'});
      this.volverListado();
    }
  }

  volverListado(): void {
    this.router.navigate(['/home']);
  }
}
