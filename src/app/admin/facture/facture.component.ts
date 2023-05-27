import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListTraitement } from '../model/traitemment.mode';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  paramId!: number;
  paramMois!: number;
  listeTache!: Array<ListTraitement>
  totalByClient!: number
  totalPageByClient!: number
  constructor(private route: ActivatedRoute, private servicetraiter: TraiterService, private servicetaches: TachesService, private servicesAuth: UtilisateurAuthService) {
    this.route.paramMap.subscribe(params => {
      const param1 = params.get('id');
      const param2 = params.get('mois');
      this.paramId = parseInt(param1!);
      this.paramMois = parseInt(param2!);
    });
  }
  ngOnInit(): void {
  }
  selectByClient() {
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          return res.reception?.operationEntree.user.id == this.paramId;
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }
}
