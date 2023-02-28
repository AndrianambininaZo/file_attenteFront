import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  texta:string="Numéro 1. Guichet 10";

  constructor() { }

  ngOnInit(): void {

  }
public text(){
    let parole=new SpeechSynthesisUtterance();
    parole.text=this.texta;
    parole.pitch=1;
    speechSynthesis.speak(parole);
   }

}
