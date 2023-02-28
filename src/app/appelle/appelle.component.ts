import { Component, OnInit } from '@angular/core';
import { AppelleService } from '../services/appelle.service';

@Component({
  selector: 'app-appelle',
  templateUrl: './appelle.component.html',
  styleUrls: ['./appelle.component.scss']
})
export class AppelleComponent implements OnInit {
  appelle!:string; 
  operation!:any; 

  constructor(private appelleServices:AppelleService) { }

  ngOnInit(): void {
  }
  appelleClient(){
    if(this.appelle)
      this.voix(this.appelle);
      else
        this.voix("ity aho");
  }
  voix(text:string){
    let parole=new SpeechSynthesisUtterance();
    //let textString=text.toString;
    parole.text=text;
    parole.pitch=1;
    speechSynthesis.speak(parole);
   }

}
