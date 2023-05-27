import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../admin/model/login.model';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from '../services/utilisateur/utilisateur-auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  message!: string
  login: Login = new Login();
  constructor(private fb: FormBuilder, private services: UtilisateurService,
    private authService: UtilisateurAuthService,
    private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control("", [Validators.email, Validators.required]),
      password: this.fb.control("", [Validators.required, Validators.min(6)]),
    })
  }
  /*
  authentification() {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value
      console.log(this.login)
      this.services.authentification(this.login).subscribe((res: any) => {
        if (res.appUser.status == 1) {
          this.authService.setUser(res.appUser.nom);
          this.authService.setRole(res.appUser.role);
          this.authService.setToken(res.token);
          this.authService.setIdUser(res.appUser.id)
          if (res.appUser.role == "CLIENT") {
            this.route.navigate(['/my/client']);
          }
          else if (res.appUser.role == "ADMIN") {
            this.route.navigate(['/my']);
          } else {
            this.route.navigate(['/my/backoffice']);
          }
        } else {
          this.message = "Votre compte est bloque veuillez contacter le service"
          return;
        }

      }, (error) => {
        console.log(error);
      });

    }

  }*/
  authentification() {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value
      this.login.codeEntree = "isClient"
      this.services.authentification(this.login).subscribe({
        next: (res) => {
          if (res.user.status == 1) {
            console.log(res)
            this.authService.setUser(res.user.nom);
            this.authService.setRole(res.user.role[0].nomRole);
            this.authService.setToken(res.jwtToken);
            this.authService.setIdUser(res.user.id)
            if (res.user.role[0].nomRole == "CLIENT") {
              this.route.navigate(['/my/client']);
            } else {
              return;
            }
          }
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  }
}


