import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  urlImagenDefecto: string = '../../../assets/usuario.png';
  userForm: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  nuevoUsuario: boolean = true;
  textoFormularo: string = 'Nuevo usuario';
  textoBoton: string = 'Guardar';
  usuarioExistente: User = {
    id: 0,
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    image: '',
    username: '',
    password: '',
  };

  constructor() {
    this.userForm = new FormGroup(
      {
        id: new FormControl('', []),
        _id: new FormControl('', []),
        first_name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        last_name: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),
        image: new FormControl('', [
          Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/),
        ]),
      },
      []
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = params.idUser;
      if (id != undefined) {
        this.textoFormularo = 'Actualizar usuario';
        this.textoBoton = 'Actualizar';
        try {
          let response = await this.userService.GetUserById(id);
          if (response._id === undefined) {
            this.router.navigate(['/newuser']);
          }
          this.nuevoUsuario = false;
          this.usuarioExistente = response;
          ///lleno de nuevo el formulario
          this.userForm = new FormGroup(
            {
              id: new FormControl(response.id, []),
              _id: new FormControl(response._id, []),
              first_name: new FormControl(response.first_name, [
                Validators.required,
                Validators.minLength(3),
              ]),
              last_name: new FormControl(response.last_name, [
                Validators.required,
              ]),
              email: new FormControl(response.email, [
                Validators.required,
                Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/),
              ]),
              image: new FormControl(response.image, [
                Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/),
              ]),
            },
            []
          );
          this.urlImagenDefecto = response.image;
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error en el acceso usuario. Consulte con el administrador.',
          });
          this.router.navigate(['/home']);
        }
      } else {
        this.nuevoUsuario = true;
      }
    });
  }

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.userForm.get(formcontrolName)?.hasError(validator) &&
      this.userForm.get(formcontrolName)?.touched
    );
  }

  sinAcentos(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  remplazarEspaciosPorPuntos(input: string): string {
    return input.replace(/\s+/g, '.');
  }

  crearNombreUsuario(input: string): string {
    return this.remplazarEspaciosPorPuntos(
      this.sinAcentos(input).toLowerCase()
    );
  }

  CambiarUrlImagen() {
    let url = this.userForm.value.image;
    if (url != undefined && url != '') {
      this.urlImagenDefecto = this.userForm.value.image;
    }
  }

  async getDataForm() {
    if (this.nuevoUsuario) {
      let usuario: User = {
        _id: '',
        id: 0,
        first_name: this.userForm.value.first_name,
        last_name: this.userForm.value.last_name,
        email: this.userForm.value.email,
        image: this.userForm.value.image,
        username: this.crearNombreUsuario(
          this.userForm.value.first_name + ' ' + this.userForm.value.last_name
        ),
        password: '12345',
      };
      try {
        let response = await this.userService.NewUser(usuario);
        console.log(response);
        this.userForm.reset();
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente.',
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title:
              'Error en el proceso de creación del usuario. Consulte con el administrador.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title:
            'Error en el proceso de creación del usuario. Consulte con el administrador.',
        });
      }
    } else {
      let usuario: User = {
        _id: this.usuarioExistente._id,
        id: this.usuarioExistente.id,
        first_name: this.userForm.value.first_name,
        last_name: this.userForm.value.last_name,
        email: this.userForm.value.email,
        image: this.userForm.value.image,
        username: this.usuarioExistente.username,
        password: this.usuarioExistente.password,
      };
      try {
        let response = await this.userService.UpdateUser(usuario);

        console.log(response);
        if (response.id) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado correctamente.',
          });
          this.router.navigate(['/home']);
        } else {
          Swal.fire({
            icon: 'error',
            title:
              'Error en el proceso de actualización del usuario. Consulte con el administrador.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title:
            'Error en el proceso de actualización del usuario. Consulte con el administrador.',
        });
      }
    }
  }
}
