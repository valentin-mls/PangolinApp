import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Pangolin {
  _id: string;
  username: string;
  password: string;
  role: string;
  friends: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PangolinService {
  private baseUrl = 'http://localhost:3000/api/pangolins';

  constructor(private http: HttpClient) {}

  register(pangolin: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/register`, pangolin);
  }

  // login(credentials: Object): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}/login`, credentials);
  // }
  login(pangolin: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, pangolin)
      .pipe(catchError(this.handleError));
  }

  updateRole(id: string, role: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/role`, { id, role });
  }

  addFriend(id: string, friendId: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/addFriend`, { id, friendId });
  }

  removeFriend(id: string, friendId: string): Observable<Object> {
    return this.http.put(`${this.baseUrl}/removeFriend`, { id, friendId });
  }
  getProfile(id: string): Observable<Object> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get(`${this.baseUrl}/${id}`, { headers: headers });
  }

  getAllPangolins(): Observable<Pangolin[]> {
    return this.http.get<Pangolin[]>(`${this.baseUrl}`);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur est survenue:', error.error.message);
    } else {
      console.error(
        `Le backend a renvoyé le code ${error.status}, corps était: ${error.error}`
      );
    }
    return throwError(
      'Quelque chose de mal est arrivé; veuillez réessayer plus tard.'
    );
  }
}
