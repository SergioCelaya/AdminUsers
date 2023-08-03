import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './pages/list-view/list-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { DetalleUserComponent } from './pages/detalle-user/detalle-user.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: ListViewComponent },
  { path: "newUser", component: UserFormComponent },
  { path: "user/:idUser", component: DetalleUserComponent}
  //{ path: '**', component: C404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
