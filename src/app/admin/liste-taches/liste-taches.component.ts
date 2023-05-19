import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOperation } from 'src/app/admin/model/listeTache.model';
import { TachesService } from 'src/app/services/taches/taches.service';
import { Reception } from '../model/reception.model';
import { type } from 'os';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-liste-taches',
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.scss']
})
export class ListeTachesComponent implements OnInit {
  listeOperation!: Array<ListOperation>
  reception: Reception = new Reception();
  client!: any
  inputrechercher!: number

  constructor(private sevichetache: TachesService, private user: UtilisateurService) { }

  ngOnInit(): void {
    this.getClieent();
    this.getListeTache();

  }

  getClieent() {
    this.user.listUtilisateur().subscribe(
      {
        next: (data) => {
          this.client = data.filter(client => {
            return client.role == "CLIENT"
          });
        }
      }
    )
  }
  getListeTache() {
    this.sevichetache.getListe().subscribe({
      next: (data) => {
        this.listeOperation = data

      }
    })
  }
  selectByClient(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.inputrechercher = parseInt(value)
    console.log(this.inputrechercher)
    this.sevichetache.getListe().subscribe(
      {
        next: (data) => {
          this.listeOperation = data.filter(op => {
            if (this.inputrechercher == 0) {
              return op;
            }
            return op.user.id == this.inputrechercher;
          })
        }
      }
    )
  }

}