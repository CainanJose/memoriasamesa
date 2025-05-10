import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule]
})
export class FavoritosComponent implements OnInit {
  receitasFavoritas: any[] = [];
  receitaSelecionada: any = null;
  token: string | null = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private receitasService: ReceitasService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      this.http.get<any>('http://localhost:8000/users/data', { headers }).subscribe({
        next: (usuario) => {
          const favoritosIds = usuario.favRecipesID || [];
          this.receitasService.getReceitas().subscribe({
            next: (todas) => {
              this.receitasFavoritas = Object.values(todas).filter((r: any) =>
                favoritosIds.includes(r.id)
              );
            },
            error: (e) => console.error('Erro ao buscar receitas:', e)
          });
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
        }
      });
    }
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
    this.http.delete(`http://localhost:8000/users/favorite/${receitaId}`, { headers }).subscribe({
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
