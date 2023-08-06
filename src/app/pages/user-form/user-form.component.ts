import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  urlImagenDefecto: string = '../../../assets/usuario.png';
  userForm: FormGroup;
  postsService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  nuevoUsuario: boolean = true;
  textoFormularo:string = "Nuevo usuario"

  constructor() {
    this.userForm = new FormGroup(
      {
        id: new FormControl('', []),
        _id: new FormControl('', []),
        first_name: new FormControl('', []),
        last_name: new FormControl('', []),
        email: new FormControl('', []),
        image: new FormControl('', [])
      },
      []
    );
  }

ngOnInit(){
  this.activatedRoute.params.subscribe(async (params: any) => {
    let id: string = params.idUser;
    if (id!= undefined) {
      this.textoFormularo = "Actualizar usuario";
      let response = await this.postsService.GetUserById(id)
      if(response._id === undefined){
        this.router.navigate(['/newuser']);
      }
      this.nuevoUsuario = false;
      ///lleno de nuevo el formulario
      this.userForm = new FormGroup(
        {
          id: new FormControl(response.id, []),
          _id: new FormControl(response._id, []),
          first_name: new FormControl(response.first_name, []),
          last_name: new FormControl(response.last_name, []),
          email: new FormControl(response.email, []),
          image: new FormControl(response.image, [])
        },
        []
      );
      this.urlImagenDefecto = response.image;
    }else{
      this.nuevoUsuario = true;
    }
  })
}

  getDataForm() {}
}
