import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { FisicasComponent } from './components/fisicas/fisicas.component';
import { BookComponent } from './components/book/book.component';
import { RoleGuard } from './services/role.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "services", component: ServiciosComponent },
  { path: "list", component: BookListComponent },
  { path: "book/:id", component: BookComponent },
  { path: "login", component: LoginComponent },
  { path: "cuenta", component: CuentaComponent },
  { path: "fisicas", component: FisicasComponent },
  { path: "admin", component: AdminComponent, canActivate: [RoleGuard] },
  { path: '**', redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
