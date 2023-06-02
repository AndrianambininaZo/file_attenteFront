import { Component, OnInit } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListeReception } from '../../model/receptionListe.model';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';

@Component({
  selector: 'app-backoofiche-dasboard',
  templateUrl: './backoofiche-dasboard.component.html',
  styleUrls: ['./backoofiche-dasboard.component.scss']
})
export class BackooficheDasboardComponent implements OnInit {
  listereception!: Array<ListeReception>
  mois: any = []
  moi!: number
  annee: any = []
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();
  constructor(private utilisateurService: UtilisateurAuthService, private serviceTraiter: TraiterService) {
    this.moi = new Date().getMonth()
    let annee = new Date().getFullYear();
    this.annee = [annee, annee - 1]
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
    this.getListeReception();
  }
  getListeReception() {
    console
    this.serviceTraiter.getReceptionTache().subscribe({
      next: (data) => {
        console.log(data)
        this.listereception = data.filter((rec: { user: { id: any; }; operationEntree: { status: string } }) => {
          return rec.user.id == this.idUser && rec.operationEntree.status == "Traitée";
        })
        console.log(this.listereception)
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  selectByMois(event: Event) {

  }

}
