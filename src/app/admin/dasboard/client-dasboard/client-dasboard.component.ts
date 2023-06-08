import { Component, OnInit } from '@angular/core';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { ListOperation } from '../../model/listeTache.model';
import { Reception } from '../../model/reception.model';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dasboard',
  templateUrl: './client-dasboard.component.html',
  styleUrls: ['./client-dasboard.component.scss']
})
export class ClientDasboardComponent implements OnInit {
  listeTraitement!: any
  reception: Reception = new Reception();
  client!: any
  mois: any = []
  moi!: number
  annee!: number
  annees: any = []
  inputrechercher!: number
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();
  isLoggedIn!: boolean

  constructor(private route: Router, private servicetraiter: TraiterService, private sevichetache: TachesService, private user: UtilisateurService, private utilisateurService: UtilisateurAuthService) {
    this.isLoggedIn = utilisateurService.isLoggeInClient()
    this.moi = new Date().getMonth()
    this.annee = new Date().getFullYear();
    this.annees = [this.annee, this.annee - 1]
    let mois = [
      { id: 0, mois: "janvier" },
      { id: 1, mois: "Fevirer" },
      { id: 2, mois: "Mars" },
      { id: 3, mois: "Avril" },
      { id: 4, mois: "Mai" },
      { id: 5, mois: "Juin" },
      { id: 6, mois: "Juiller" },
      { id: 7, mois: "Aout" },
      { id: 8, mois: "Septebre" },
      { id: 9, mois: "Octobre" },
      { id: 10, mois: "Novembre" },
      { id: 11, mois: "Decembre" },
    ]
    this.mois = mois.filter(re => {
      return re.id != this.moi
    })
    const nomMois = mois[this.moi]
    this.mois.unshift(nomMois)
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.route.navigateByUrl("/")
    }
    this.getTraitement()
  }
  getTraitement() {
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTraitement = data.filter((res) => {
          return res.annee == this.annee && res.mois == this.moi && res.reception.operationEntree.user.id == this.idUser && res.reception.operationEntree.status == "Traitée";
        })
      }
    })
  }
  telechargeFile(id: number, codeTache: string) {
    this.servicetraiter.telechargerDocTraiter(id).subscribe({
      next: (data) => {
        let blob: Blob = data.body as Blob
        let a = document.createElement('a');
        a.download = codeTache;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }
  selectByMois(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.moi = parseInt(value)
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTraitement = data.filter((res) => {
          return res.annee == this.annee && res.mois == this.moi && res.reception.operationEntree.user.id == this.idUser && res.reception.operationEntree.status == "Traitée";
        })
      }
    })
  }
  selectByMoisAndAnnee(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.annee = parseInt(value)
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTraitement = data.filter((res) => {
          return res.annee == this.annee && res.mois == this.moi && res.reception.operationEntree.user.id == this.idUser && res.reception.operationEntree.status == "Traitée";
        })
      }
    })
  }
}
