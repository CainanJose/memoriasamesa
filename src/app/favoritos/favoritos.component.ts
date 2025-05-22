import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NavbarComponent } from '../navbar/navbar.component';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';

import { DadosUsuario } from '../interfaces/dadosUsuario';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  imports: [NavbarComponent, CommonModule],
})
export class FavoritosComponent implements OnInit {
  receitasFavoritas: any[] = [];
  receitaSelecionada: any = null;
  token: string | null = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.token = this.tokenService.getToken();

    if (!username || !this.token) return;

    this.usuarioService.getDadosUsuario(username).subscribe({
      next: (res: DadosUsuario) => {
        this.receitasFavoritas = res.favorited_recipes || [];
        console.log('🌟 Favoritas carregadas:', this.receitasFavoritas);
      },
      error: (err) => {
        console.error('❌ Erro ao buscar dados do usuário:', err);
      }
    });
  }

  abrirModal(receita: any): void {
    this.receitaSelecionada = receita;
  }

  fecharModal(): void {
    this.receitaSelecionada = null;
  }

  desfavoritar(receitaId: number): void {
    if (!this.token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete(`http://localhost:8000/receitas/${receitaId}/favorite`, { headers }).subscribe({
      next: () => {
        this.receitasFavoritas = this.receitasFavoritas.filter(r => r.id !== receitaId);
        this.fecharModal();
      },
      error: (err) => {
        console.error('Erro ao desfavoritar:', err);
      }
    });
  }
}
