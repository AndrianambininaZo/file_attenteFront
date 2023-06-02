import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../admin/model/login.model';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from '../services/utilisateur/utilisateur-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-for-admin',
  templateUrl: './login-for-admin.component.html',
  styleUrls: ['./login-for-admin.component.scss']
})
export class LoginForAdminComponent implements OnInit {
  loginForm!: FormGroup
  message!: string
  login: Login = new Login();

  constructor(private fb: FormBuilder, private services: UtilisateurService,
    private authService: UtilisateurAuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control("", [Validators.email, Validators.required]),
      password: this.fb.control("", [Validators.required, Validators.min(6)]),
    })
  }
  authentification() {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value
      this.login.codeEntree = "isBackAndAdmin"
      this.services.authentificationIsAdmin(this.login).subscribe({
        next: (res) => {
          if (res.user.status == 1) {
            if (res.user.role[0].nomRole == "ADMIN") {
              this.authService.setUser(res.user.nom);
              this.authService.setRole(res.user.role[0].nomRole);
              this.authService.setToken(res.jwtToken);
              this.authService.setIdUser(res.user.id)
              this.route.navigate(['/my']);
            } else if (res.user.role[0].nomRole == "BACKOFFICE") {
              this.authService.setUser(res.user.nom);
              this.authService.setRole(res.user.role[0].nomRole);
              this.authService.setToken(res.jwtToken);
              this.authService.setIdUser(res.user.id)
              this.route.navigate(['/my/backoffice']);
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


