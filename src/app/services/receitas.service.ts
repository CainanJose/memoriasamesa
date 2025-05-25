import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private apiUrl = 'https://memorias-api-fastapi-hjd7ataje3h9epft.brazilsouth-01.azurewebsites.net/receitas';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getReceitas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  cadastrarReceita(receita: any): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, receita, { headers });
  }

  favoritarReceita(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${id}/favorite`, {}, { headers });
  }

  removerFavorito(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id}/favorite`, { headers });
  }

  getReceitasFavoritasDoUsuario(username: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user/${username}/data`, { headers });
  }
}
