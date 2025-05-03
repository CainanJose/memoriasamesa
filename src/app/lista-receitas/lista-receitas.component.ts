import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-receitas',
  standalone: true, // 👈 isso aqui é obrigatório
  imports: [CommonModule,FormsModule, NavbarComponent], // 👈 importa CommonModule aqui também
  templateUrl: './lista-receitas.component.html',
  styleUrl:'./lista-receitas.component.css'
})
export class ListaReceitasComponent implements OnInit {
  receitas: any[] = [];
  emocaoSelecionada: string = '';
  emocoesDisponiveis: string[] = [];


  constructor(private receitasService: ReceitasService) {}

  ngOnInit(): void {
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
  getReceitasFiltradas(): any[] {
    if (!this.emocaoSelecionada) return this.receitas;
    return this.receitas.filter(r =>
      r.sentimentoReceita?.includes(this.emocaoSelecionada)
    );
  }
    
}
