import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../interfaces/receitas';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private apiUrl = 'http://localhost:8000/receitas';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getReceitas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  cadastrarReceita(receita: any) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post('http://localhost:8000/receitas', receita, { headers });
  }
  
  favoritarReceita(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://localhost:8000/users/favorite/${id}`, {}, { headers });
  }  
  removerFavorito(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`http://localhost:8000/users/favorite/${id}`, { headers });
  }
  
  getUserData(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8000/users/data', { headers });
  }
  
}
