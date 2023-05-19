import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraiterService } from 'src/app/services/traiter/traiter.service';

@Component({
  selector: 'app-telecharger-of-offiche',
  templateUrl: './telecharger-of-offiche.component.html',
  styleUrls: ['./telecharger-of-offiche.component.scss']
})
export class TelechargerOfOfficheComponent implements OnInit {
  idOperation!: number

  constructor(route: ActivatedRoute, private serviceTraiter: TraiterService) {
    this.idOperation = route.snapshot.params['id'];
  }

  ngOnInit(): void {

  }
  teleChargerDoc() {
    alert(this.idOperation)
    this.serviceTraiter.telechargerDoc(this.idOperation).subscribe({
      next: (data) => {
        console.log(data)
      }
    });
  }
  teleChargerAudio() {
    this.serviceTraiter.telechargerAudio(this.idOperation).subscribe({
      next: (data) => {
        console.log(data)
      }
    });

  }

}
