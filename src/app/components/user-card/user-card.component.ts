import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() usuario!: User;
  router = inject(Router);

  detalleUser(id: string) {
    if (id != undefined) {
      this.router.navigate(['/user/' + id]);
    }else{
      alert("Existe un error en el detalle del usuario" )
    }
  }
}
