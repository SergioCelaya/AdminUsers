import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() usuario!: User;
  router = inject(Router);
  servicioUsers = inject(UsersService);

  detalleUser(id: string) {
    if (id != undefined) {
      this.router.navigate(['/user/' + id]);
    }else{
      Swal.fire({icon: 'error',title:'Existe un error en el detalle del usuario'});
    }
  }

  updateUser(id: string){
    if (id != undefined) {
      this.router.navigate(['/updateuser/' + id]);
    }else{
      Swal.fire({icon: 'error',title:'Existe un error al querer actualizar el usuario'});
    }
  }

  async eliminarUser(id:string){
    let response = await this.servicioUsers.EliminarUser(id);
    if(response._id == undefined){
      Swal.fire({icon: 'error',title:'Se ha producido un error al borrar el usuario indicado.'});
    }else{
      Swal.fire({icon: 'success',title:'El usuario ha sido borrado correctamente.'});
      this.router.navigate(['/home']);
    }
  }


}
