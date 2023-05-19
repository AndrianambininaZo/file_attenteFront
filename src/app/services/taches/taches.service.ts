import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationEntree } from 'src/app/admin/model/operationEntree.mode';
import { ListOperation } from 'src/app/admin/model/listeTache.model';
import { environment } from 'src/environments/environment';
import { Reception } from 'src/app/admin/model/reception.model';


@Injectable({
  providedIn: 'root'
})
export class TachesService {


  constructor(private http: HttpClient) { }
  public creerTaches(operation: OperationEntree): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/create_tache", operation);
  }
  public creerDoc(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload/" + id, formDoc);
  }
  public creerAdio(formAudio: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload/" + id, formAudio);
  }
  public getListe(): Observable<Array<ListOperation>> {
    return this.http.get<Array<ListOperation>>(environment.backEndHost + "/api/list_Operation");
  }
  public receptioTache(reception: Reception): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/reception", reception);
  }
  public getListeByClient(id: number): Observable<Array<ListOperation>> {
    return this.http.get<Array<ListOperation>>(environment.backEndHost + "/api/list_Operation/" + id);
  }
}
