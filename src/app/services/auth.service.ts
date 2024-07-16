import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  // Define other response fields if any
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://127.0.0.1:8000/api/login/';
  isAuthenticated: boolean;


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email, password });
    return this.http.post<LoginResponse>(this.loginUrl, body, { headers });
  }

}
