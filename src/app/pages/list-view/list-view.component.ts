import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  arrayUsers:User[] = [];
  usersService = inject(UsersService);

  async ngOnInit():Promise<void>{
    try{

    }catch(error){
      console.log(error)
    }
  }

}
