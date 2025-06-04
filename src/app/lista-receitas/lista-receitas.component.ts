import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { Usuario } from '../interfaces/usuario'; // novo import

@Component({
  selector: 'app-lista-receitas',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './lista-receitas.component.html',
  styleUrls: ['./lista-receitas.component.css']

})
export class ListaReceitasComponent implements OnInit {
  receitas: any[] = [];
  emocaoSelecionada: string = '';
  emocoesDisponiveis: string[] = [];
  modoFavoritos = false;
  favoritedReceitasIds: number[] = [];
  

  usuario: Usuario | null = null; // novo campo

  constructor(private receitasService: ReceitasService) {}

  ngOnInit(): void {
    this.carregarReceitas(); // ✅ sempre carrega as receitas

    const username = localStorage.getItem('username');
    if (username) {
      this.receitasService.getReceitasFavoritasDoUsuario(username).subscribe({
        next: (res) => {
          this.favoritedReceitasIds = res.favorited_recipes.map((r: any) => r.id);
        },
        error: (err) => {
          console.error('❌ Erro ao buscar receitas favorited:', err);
        }
      });
    } else {
      console.warn('⚠️ Username não encontrado no localStorage. Não será possível buscar favoritas.');
    }
  }
  
  carregarReceitas(): void {
    this.receitasService.getReceitas().subscribe({
      next: (dados) => {
        this.receitas = Object.values(dados);
  
        this.emocoesDisponiveis = [...new Set(
          this.receitas.flatMap(r => r.sentimentoReceita || [])
        )];
      },
      error: (erro) => {
        console.error('❌ Erro ao buscar receitas:', erro);
      }
    });
  }
  
  
     
favoritar(receitaId: number): void {
  const jaFavoritada = this.favoritedReceitasIds.includes(receitaId);

  const acao = jaFavoritada
    ? this.receitasService.removerFavorito(receitaId)
    : this.receitasService.favoritarReceita(receitaId);

  acao.subscribe({
    next: () => {

      if (jaFavoritada) {
        this.favoritedReceitasIds = this.favoritedReceitasIds.filter(id => id !== receitaId);
      } else {
        this.favoritedReceitasIds = [...this.favoritedReceitasIds, receitaId];
      }
    },
    error: (erro) => {
      console.error('❌ Erro ao alternar favorito:', erro);
    }
  });
}


  
  getReceitasFiltradas(): any[] {
    let filtradas = this.receitas;
  
    if (this.modoFavoritos) {
      filtradas = filtradas.filter(r => this.favoritedReceitasIds.includes(r.id));
    }
  
    if (this.emocaoSelecionada) {
      filtradas = filtradas.filter(r =>
        r.sentimentoReceita?.includes(this.emocaoSelecionada)
      );
    }
  
    return filtradas;
  }
  

  // 🔥 NOVO: verifica se a receita está favoritada
  isFavorited(receitaId: number): boolean {
    return this.favoritedReceitasIds.includes(receitaId);
  }
  
}
