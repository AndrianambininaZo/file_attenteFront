import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTraitement } from '../model/traitemment.mode';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import * as XLSX from 'xlsx';
class TableFacture {
  code?: number;
  id?: string
}

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  totalPageItems: any;
  page: number = 1;
  paramId!: number;
  paramMois!: number;
  listeTache!: Array<ListTraitement>
  totalByClient!: number
  totalPageByClient!: number
  id!: string;
  idUser!: string;
  userNom!: string
  annee!: string
  array: Array<TableFacture> = new Array();
  constructor(private route: ActivatedRoute, private router: Router, private servicetraiter: TraiterService, private servicetaches: TachesService, private servicesAuth: UtilisateurAuthService) {
    this.id = this.route.snapshot.queryParamMap.get('id')!;
    this.idUser = this.route.snapshot.queryParamMap.get('idUser')!;
    this.annee = this.route.snapshot.queryParamMap.get('annee')!;
  }
  ngOnInit(): void {
    if (this.id == "" || this.idUser == "")
      this.router.navigateByUrl("/");
    console.log(this.id)
    console.log(this.idUser)
    this.selectByClient();
  }
  selectByClient() {
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        console.log(data)
        this.listeTache = data.filter((res) => {
          return res.reception?.operationEntree.user.id == parseInt(this.id) && res.mois == parseInt(this.idUser!) && res.annee == parseInt(this.annee);
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
        console.log(this.array)
      }
    })
  }

  exportExcel() {
    let elem = document.getElementById("table-listeR");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(elem);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "ExcelSheet.xlsx")
  }
}
