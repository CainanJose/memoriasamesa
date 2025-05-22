import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { DadosUsuario } from '../interfaces/dadosUsuario'; // ✅ Tipagem correta

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUserData(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:8000/users/data`, { headers });
  }
  cadastrar(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  // ✅ Este método é responsável por buscar dados relacionados ao usuário
  getDadosUsuario(username: string): Observable<DadosUsuario> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<DadosUsuario>(`http://localhost:8000/receitas/user/${username}/data`, { headers });
  }
}
