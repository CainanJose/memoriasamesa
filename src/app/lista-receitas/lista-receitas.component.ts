import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-receitas',
  standalone: true, // 👈 isso aqui é obrigatório
  imports: [CommonModule], // 👈 importa CommonModule aqui também
  templateUrl: './lista-receitas.component.html',
  styleUrl:'./lista-receitas.component.css'
})
export class ListaReceitasComponent implements OnInit {
  receitas: any[] = [];

  constructor(private receitasService: ReceitasService) {}

  ngOnInit(): void {
    this.receitasService.getReceitas().subscribe({
      next: (dados) => {
        //console.log('✅ Receitas recebidas:', dados);
        this.receitas = Object.values(dados);
        console.log(this.receitas[0])
      },
      error: (erro) => {
        console.error('❌ Erro ao buscar receitas:', erro);
      }
    });
  }
}
