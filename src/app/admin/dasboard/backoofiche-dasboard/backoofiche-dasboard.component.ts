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

  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();
  constructor(private utilisateurService: UtilisateurAuthService, private serviceTraiter: TraiterService) { }

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

}
