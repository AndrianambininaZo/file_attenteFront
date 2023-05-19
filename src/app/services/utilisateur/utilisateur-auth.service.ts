import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurAuthService {

  constructor() { }
  public setUser(user: string) {
    localStorage.setItem("user", user);
  }
  public setRole(role: string) {
    localStorage.setItem("role", role);
  }
  public getRole(): string {
    return localStorage.getItem('role')!;
  }
  public setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }
  public clear() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
  }
  public isLoggeIn() {
    return this.getRole() && this.getToken();
  }
  public setIdUser(id: number) {
    var idLocal = id.toString();
    localStorage.setItem('idUser', idLocal);
  }
  public getIdUser() {
    var idGet = localStorage.getItem('idUser');
    return idGet;
  }
  public getUser() {
    var user = localStorage.getItem('user');
    return user;
  }
}
