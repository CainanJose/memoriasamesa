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

  constructor(private http: HttpClient,private tokenService: TokenService) { }

  getReceitas(): Observable<any> {
    return this.http.get(this.apiUrl); // simples sem headers
  }
}