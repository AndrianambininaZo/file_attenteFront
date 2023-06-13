import { Component, OnInit } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { UtilisateurRequest } from '../model/utilisateur.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestPassword } from '../model/requestPassword.model';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {
  idUser: any = this.utilisateurService.getIdUser();
  utilisateur: UtilisateurRequest = new UtilisateurRequest();
  email: any
  formPassword!: FormGroup
  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurAuthService, private service: TraiterService) {
    let id = parseInt(this.idUser)
    service.getUtilisateur(id).subscribe({
      next: (data) => {
        this.utilisateur = data
        this.email = data.email
      }
    })
  }

  ngOnInit(): void {
    this.formPassword = this.fb.group({
      setPassword: this.fb.control("", [Validators.required]),
      confirmPassword: this.fb.control("", [Validators.required]),
    })
  }
  setPassword() {
    if (this.formPassword.valid) {
      if (this.formPassword.controls['setPassword'].value == this.formPassword.controls['confirmPassword'].value) {
        let requestPassword = new RequestPassword();
        requestPassword.password = "azertyuiop";
        requestPassword = this.formPassword.value
        requestPassword.id = parseInt(this.idUser)
        this.service.setPassword(requestPassword).subscribe({
          next: (data) => {
            this.formPassword.reset(0)
          }, error: (err) => {
            alert("Erreur serveur")
          }
        })

      } else {
        alert("Verifier le nouveau mot de passe")
      }

    } else {
      alert("Veillez remplir tous le champs")
    }
  }
}
