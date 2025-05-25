import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { DadosUsuario } from '../interfaces/dadosUsuario'; // ✅ Tipagem correta

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://memorias-api-fastapi-hjd7ataje3h9epft.brazilsouth-01.azurewebsites.net/users';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUserData(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`https://memorias-api-fastapi-hjd7ataje3h9epft.brazilsouth-01.azurewebsites.net/users/data`, { headers });
  }
  cadastrar(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  // ✅ Este método é responsável por buscar dados relacionados ao usuário
  getDadosUsuario(username: string): Observable<DadosUsuario> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<DadosUsuario>(`https://memorias-api-fastapi-hjd7ataje3h9epft.brazilsouth-01.azurewebsites.net/receitas/user/${username}/data`, { headers });
  }
}
