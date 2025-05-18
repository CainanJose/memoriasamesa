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
  styleUrl: './lista-receitas.component.css'
})
export class ListaReceitasComponent implements OnInit {
  receitas: any[] = [];
  emocaoSelecionada: string = '';
  emocoesDisponiveis: string[] = [];
  modoFavoritos = false;
  

  usuario: Usuario | null = null; // novo campo

  constructor(private receitasService: ReceitasService) {}

  ngOnInit(): void {
    const state = history.state;
    this.modoFavoritos = state?.modoFavoritos ?? false;
  
    // Carrega receitas SEMPRE
    this.carregarReceitas();
  
    // Tenta carregar o usuário (se der erro, apenas ignora)
    this.receitasService.getUserData().subscribe({
      next: (userData) => {
        this.usuario = userData;
        localStorage.setItem('usuario', JSON.stringify(userData));
      },
      error: (erro) => {
        console.warn('⚠️ Não foi possível carregar o usuário:', erro);
      }
    });
  }
  
  carregarReceitas(): void {
    this.receitasService.getReceitas().subscribe({
      next: (dados) => {
        this.receitas = Object.values(dados);
        console.log('🧠 Receitas carregadas:', this.receitas);
  
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
    if (!this.usuario) return;
    const jaFavoritada = this.usuario.favRecipesID.includes(receitaId);
    const acao = jaFavoritada
      ? this.receitasService.removerFavorito(receitaId)
      : this.receitasService.favoritarReceita(receitaId);
    
    
  
    acao.subscribe({
      next: () => {
        if (jaFavoritada) {
          this.usuario!.favRecipesID = this.usuario!.favRecipesID.filter(id => id !== receitaId);
          console.log('teste1');
        } else {
          this.usuario!.favRecipesID = [...this.usuario!.favRecipesID, receitaId];
          console.log('teste2');
        }
      },
      error: (erro) => {
        console.error('❌ Erro ao alternar favorito:', erro);
      }
    });
  }
  
  
  
  getReceitasFiltradas(): any[] {
    let filtradas = this.receitas;
  
    if (this.modoFavoritos && this.usuario?.favRecipesID) {
      filtradas = filtradas.filter(r => this.usuario!.favRecipesID.includes(r.id));
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
    return this.usuario?.favRecipesID?.includes(receitaId) ?? false;
  }

  
}
