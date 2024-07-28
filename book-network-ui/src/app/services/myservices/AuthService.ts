import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  authenticate(credentials: { email: string; password: string }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Include other necessary headers like Authorization if required
    });

    return this.http.post('http://localhost:8088/api/v1/auth/authenticate', credentials, { headers });
  }
}
