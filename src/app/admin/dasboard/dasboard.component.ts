import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TachesService } from 'src/app/services/taches/taches.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ListOperation } from '../model/listeTache.model';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  listeTache!: Array<ListOperation>
  tachesAjourdui: any
  token!: string
  constructor(private servicetaches: TachesService, private servicesAuth: UtilisateurAuthService, private http: HttpClient) {
    this.token = servicesAuth.getToken();
  }

  ngOnInit(): void {
    this.getTaches();
    this.getTachesAjourdui()
    console.log(new Date("2023-05-12T05:12:43.000+00:00").getDay())
  }
  getTaches() {
    this.servicetaches.getListe().subscribe({
      next: (data) => {
        this.listeTache = data
        console.log(this.listeTache)
      }
    })

  }
  getTachesAjourdui() {
    this.servicetaches.getListe().subscribe({
      next: (data) => {
        this.tachesAjourdui = data.filter((tache) => {
          return tache.dateOperation.toDateString() == new Date().getFullYear().toString();
        })
        console.log(this.tachesAjourdui)
      }
    })

  }
  tst() {
    this.http.get("http://localhost:8085/demo", { headers: this.heders() }).subscribe({
      next: (data) => {
        console.log(data)
      }
    })
  }
  heders() {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.token }
    )
  }


}
