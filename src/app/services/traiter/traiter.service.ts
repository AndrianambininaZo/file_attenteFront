import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOperation } from 'src/app/admin/model/listeTache.model';
import { Reception } from 'src/app/admin/model/reception.model';
import { ListeReception } from 'src/app/admin/model/receptionListe.model';
import { Traitemment } from 'src/app/admin/model/traitemment.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraiterService {

  constructor(private http: HttpClient) { }

  public receptionTache(reception: Reception): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/reception", reception);
  }
  public getReceptionTache(): Observable<any> {
    return this.http.get<Array<ListeReception>>(environment.backEndHost + "/api/reception");
  }
  public telechargerDoc(id: number): Observable<any> {
    return this.http.get<Array<ListeReception>>(environment.backEndHost + "/api/telechargerDoc/" + id);
  }
  public telechargerAudio(id: number): Observable<any> {
    return this.http.get<Array<ListeReception>>(environment.backEndHost + "/api/telechargerAudio/" + id);
  }
  public creerTraitemment(traitement: Traitemment): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/traitemment", traitement);
  }
  public envoyerDoc(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload_traitement/" + id, formDoc);
  }

}
