import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { Traitemment } from '../model/traitemment.mode';
@Component({
  selector: 'app-traitement-of-offiche',
  templateUrl: './traitement-of-offiche.component.html',
  styleUrls: ['./traitement-of-offiche.component.scss']
})
export class TraitementOfOfficheComponent implements OnInit {
  idOperation!: number
  formTraitement!: FormGroup
  public fileOperationDoc: any = File;
  public fileName: any = File.name;
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser()
  constructor(private router: Router, private tacheService: TraiterService, private route: ActivatedRoute, private fb: FormBuilder, private utilisateurService: UtilisateurAuthService) {
    this.idOperation = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.formTraitement = this.fb.group({
      description: this.fb.control(""),
      audio: this.fb.control(""),
    })
  }

  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationDoc = file[0];
    this.fileName = file[0].name
  }
  ajoutrTraitement(submitForm: FormGroup) {
    if (submitForm.valid) {
      const formData = new FormData();
      formData.append("files", this.fileOperationDoc, this.fileName);
      const operationEntre = new Traitemment();
      operationEntre.audio = this.formTraitement.controls['audio'].value
      operationEntre.id = this.idUser
      operationEntre.idReception = this.idOperation
      console.log(operationEntre)
      this.tacheService.creerTraitemment(operationEntre).subscribe(
        data => {
          this.tacheService.envoyerDoc(formData, data).subscribe({
            next: (data) => {
              submitForm.reset(0);
            }
          })
          this.router.navigateByUrl("/my/backoffice")
        }
      )
      // window.location.href = "http://localhost:4200/my";


    }
  }


}
