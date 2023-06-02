import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './admin/body/body.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CreertacheComponent } from './admin/creertache/creertache.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { ListeTachesComponent } from './admin/liste-taches/liste-taches.component';
import { TacheComponent } from './admin/tache/tache.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ClientDasboardComponent } from './admin/dasboard/client-dasboard/client-dasboard.component';
import { BackooficheDasboardComponent } from './admin/dasboard/backoofiche-dasboard/backoofiche-dasboard.component';
import { ListeOfOfficheComponent } from './admin/liste-of-offiche/liste-of-offiche.component';
import { ReceptionComponent } from './admin/reception/reception.component';
import { ReceptionOfOfficheComponent } from './admin/reception-of-offiche/reception-of-offiche.component';
import { TelechargerOfOfficheComponent } from './admin/telecharger-of-offiche/telecharger-of-offiche.component';
import { TraitementOfOfficheComponent } from './admin/traitement-of-offiche/traitement-of-offiche.component';
import { StatistiqueComponent } from './admin/statistique/statistique.component';
import { LoginForAdminComponent } from './login-for-admin/login-for-admin.component';
import { TraitementComponent } from './admin/traitement/traitement.component';
import { TachesJourComponent } from './admin/taches-jour/taches-jour.component';
import { FactureComponent } from './admin/facture/facture.component';
import { RouterModule } from '@angular/router';
const routes = [
  { path: 'admin/facture', component: FactureComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    BodyComponent,
    NavbarComponent,
    SidebarComponent,
    CreertacheComponent,
    DasboardComponent,
    ListeTachesComponent,
    TacheComponent,
    UtilisateurComponent,
    NotfoundComponent,
    ForbiddenComponent,
    ClientDasboardComponent,
    BackooficheDasboardComponent,
    ListeOfOfficheComponent,
    ReceptionComponent,
    ReceptionOfOfficheComponent,
    TelechargerOfOfficheComponent,
    TraitementOfOfficheComponent,
    StatistiqueComponent,
    LoginForAdminComponent,
    TraitementComponent,
    TachesJourComponent,
    FactureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
