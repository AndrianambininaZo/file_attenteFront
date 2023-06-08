import { Component, OnInit } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListTraitement } from '../model/traitemment.mode';
import { interval } from 'rxjs';

@Component({
  selector: 'app-taches-jour',
  templateUrl: './taches-jour.component.html',
  styleUrls: ['./taches-jour.component.scss']
})
export class TachesJourComponent implements OnInit {
  listByDay: Array<ListTraitement> | undefined
  errorMessage!: string

  constructor(private servicetraiter: TraiterService) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.getTotalParJour()
    })

  }
  getTotalParJour() {
    this.servicetraiter.listTraitement().subscribe(
      {
        next: (data) => {
          this.listByDay = data.filter((res) => {
            const date = new Date();
            const jour = date.getDate()
            const dadeVrais = date.toLocaleDateString("fr").replace("/", "-").replace("/", "-");
            return res.date == dadeVrais
          })
        }, error: (err) => {
          this.errorMessage = err.message
        }
      }
    )
  }

}
