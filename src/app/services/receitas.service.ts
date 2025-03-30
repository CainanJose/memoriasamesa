import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../interfaces/receitas';

@Injectable({
  providedIn: 'root'
})
export class ReceitasService {

  private apiUrl = 'http://localhost:8000/receitas';

  constructor(private http: HttpClient) { }

  getReceitas(): Observable<{ receitas: Receita[] }> {
    return this.http.get<{ receitas: Receita[] }>(this.apiUrl);
  }
}
