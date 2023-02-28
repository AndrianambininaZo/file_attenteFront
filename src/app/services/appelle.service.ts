import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppelleService {

  constructor(private http:HttpClient) { }

  public getOperation():Observable<any>{
    return this.http.get("http://localhost:8082/operation");
  }

  
}
