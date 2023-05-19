import { Component, OnInit } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListeReception } from '../model/receptionListe.model';
import { error } from 'console';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reception-of-offiche',
  templateUrl: './reception-of-offiche.component.html',
  styleUrls: ['./reception-of-offiche.component.scss']
})
export class ReceptionOfOfficheComponent implements OnInit {
  listereception!: Array<ListeReception>
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();


  constructor(private route: Router, private serviceTraiter: TraiterService, private utilisateurService: UtilisateurAuthService) { }

  ngOnInit(): void {
    this.getListeReception();
  }
  getListeReception() {
    this.serviceTraiter.getReceptionTache().subscribe({
      next: (data) => {
        this.listereception = data.filter((rec: { appUser: { id: any; }; }) => {
          return rec.appUser?.id == this.idUser
        })
        console.log(this.listereception)
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  telecharger(id: number) {
    this.route.navigateByUrl("/my/backoffice/reception/" + id);
  }
  traitemment(id: number) {
    this.route.navigateByUrl("/my/backoffice/traitement/" + id)
  }
}
