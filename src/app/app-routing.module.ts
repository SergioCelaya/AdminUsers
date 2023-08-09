import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { DetalleUserComponent } from './pages/detalle-user/detalle-user.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListViewComponent },
  { path: 'newuser', component: UserFormComponent },
  { path: 'user/:idUser', component: DetalleUserComponent },
  { path: 'updateuser/:idUser', component: UserFormComponent },
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
