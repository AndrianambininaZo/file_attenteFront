import { Component, OnInit } from '@angular/core';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListTraitement } from '../model/traitemment.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  listeTache: any
  tachesAjourdui: any
  token!: string;
  total!: any;
  totalByClient!: number;
  moi!: number
  mois: any = []
  inputRechercher!: string
  totalPageByClient!: number
  totalPageJour: any;
  totalMotsJour: any;
  listeTacheAujoudui: any;
  constructor(private route: Router, private servicetraiter: TraiterService, private servicetaches: TachesService, private servicesAuth: UtilisateurAuthService) {
    this.token = servicesAuth.getToken();
    this.moi = new Date().getMonth()

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
    this.getStatitique();
    this.getTotalParJour()
  }
  getStatitique() {
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: { mois: number; "": any; }) => {
            return res.mois == this.moi
          })
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  getTotalParJour() {
    this.servicetraiter.listTraitement().subscribe(
      {
        next: (data) => {
          this.listeTacheAujoudui = data.filter((res) => {
            const date = new Date();
            const jour = date.getDate()
            const dadeVrais = date.toLocaleDateString("fr").replace("/", "-").replace("/", "-");
            return res.date == dadeVrais
          })
          console.log(this.listeTacheAujoudui)
          this.total = this.listeTacheAujoudui.length
          this.totalMotsJour = this.listeTacheAujoudui.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageJour = this.listeTacheAujoudui.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)
        }
      }
    )
  }
  selectByMois(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.moi = parseInt(value)
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: { mois: number; "": any; }) => {
            return res.mois == this.moi
          })
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  getKey(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.inputRechercher = value
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: {
            user: any; mois: number; "": any;
          }) => {
            return res.mois == this.moi && res.user.nom.toLowerCase().includes(this.inputRechercher.toLowerCase())
          })
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  redirectfacture(idUser: number) {
    this.route.navigateByUrl("/my/admin/facture/" + idUser + "/" + this.moi)
  }
}
