import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppelleComponent } from './appelle/appelle.component';
import { EcranComponent } from './ecran/ecran.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", component:HomeComponent},
  {path:"ecran", component:EcranComponent},
  {path:"admin",component:AdminComponent},
  {path:"appelle",component:AppelleComponent},
  {path:"ticket",component:TicketComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
