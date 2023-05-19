import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TachesService } from 'src/app/services/taches/taches.service';
import { ListOperation } from '../model/listeTache.model';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { error } from 'console';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  listeOperation!: Array<ListOperation>
  idUser: any = this.utilisateurServices.getIdUser();
  inputrechercher!: string
  index!: number

  constructor(private serviceTache: TachesService, private utilisateurServices: UtilisateurAuthService) { }

  ngOnInit(): void {
    this.getTacges();



  }
  getKey(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.value
    this.inputrechercher = file
    this.serviceTache.getListeByClient(this.idUser).subscribe(
      {
        next: (data) => {
          if (this.inputrechercher) {
            this.listeOperation = data.filter(re => re.description.toLowerCase().includes(this.inputrechercher.toLowerCase()) || re.codeTache.toLowerCase().includes(this.inputrechercher.toLowerCase()))
            this.index = this.listeOperation.length
            console.log(this.index)
          } else this.listeOperation = data
        }, error: (error) => {

        }
      }
    );
  }
  getTacges() {
    this.serviceTache.getListeByClient(this.idUser).subscribe(
      {
        next: (data) => {
          this.listeOperation = data
          this.index = data.length
          console.log(this.index)

        }
      }
    )
  }
}
