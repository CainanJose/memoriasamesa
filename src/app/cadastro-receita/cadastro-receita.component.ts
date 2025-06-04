import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReceitasService } from '../services/receitas.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-cadastro-receita',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './cadastro-receita.component.html',
  styleUrls: ['./cadastro-receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {
  nomeReceita = '';
  descricaoReceita = '';
  imagemPreview: string = '';
  tempoPreparo = '';
  qtdeFinal = 1;
  sentimentoReceita: string[] = [];
  sentimentosDisponiveis: string[] = [
    'Conforto', 'Nostalgia', 'Doçura', 'Celebração', 'Familiaridade', 'Tradição',
    'Aconchego', 'Festa', 'Romance', 'Surpresa', 'Alegria'
  ];
  sentimentoSelecionado = '';
  preparos = [
    {
      modoPreparo: '',
      ingredientes: ['']
    }
  ];
  imagemReceita = '';
  observacoesUsuario = '';

  constructor(
    private router: Router,
    private receitasService: ReceitasService,
    private tokenService: TokenService
  ) {}

  // 🔐 Verifica se está logado
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (!token || token === 'undefined' || token === 'null') {
      setTimeout(() => {
        alert('Você precisa estar logado para cadastrar uma receita.');
        this.router.navigate(['/login']);
      }, 0);
    }
  }
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemReceita = reader.result as string;
        this.imagemPreview = this.imagemReceita; // 👈 Aqui é o preview
      };
      reader.readAsDataURL(file);
    } else {
      alert('Formato de imagem inválido. Use JPG, PNG ou WebP.');
    }
  }
  

  salvar() {
    // Verificação manual
    const camposInvalidos = [];

    if (!this.nomeReceita.trim()) {
      camposInvalidos.push('Nome da Receita');
    }
    if (this.sentimentoReceita.length === 0) {
      camposInvalidos.push('Sentimentos');
    }

    if (!this.descricaoReceita.trim()) {
      camposInvalidos.push('História da Receita');
    }

    const etapasInvalidas = this.preparos.some(etapa =>
      !etapa.modoPreparo.trim() || etapa.ingredientes.some(i => !i.trim())
    );

    if (etapasInvalidas) {
      camposInvalidos.push('Etapas de Preparo');
    }

    if (camposInvalidos.length > 0) {
      alert(`Preencha corretamente os campos obrigatórios: ${camposInvalidos.join(', ')}`);
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('⚠️ Não foi possível identificar o usuário logado. Faça login novamente.');
      this.router.navigate(['/login']);
      return;
    }

    // Continua com o envio se passou na validação
    const receita = {
      nomeReceita: this.nomeReceita,
      descricaoReceita: this.descricaoReceita,
      sentimentoReceita: this.sentimentoReceita,
      preparos: this.preparos,
      tempoPreparo: this.tempoPreparo,
      imagemReceita: this.imagemReceita,
      qtdeFinal: this.qtdeFinal,
      observacoesUsuario: this.observacoesUsuario,
      autorId: userId // 👈 AQUI está o campo novo
    };



    this.receitasService.cadastrarReceita(receita).subscribe({
      next: () => {
        alert('Receita cadastrada com sucesso!');
        this.router.navigate(['/listareceitas']);
      },
      error: (err) => {
        console.error('❌ Erro ao cadastrar:', err);
        alert('Erro ao cadastrar receita.');
      }
    });
  }

  
  
  adicionarSentimento() {
    const novo = this.sentimentoSelecionado.trim();
    if (novo && !this.sentimentoReceita.includes(novo)) {
      this.sentimentoReceita.push(novo);

      this.sentimentoSelecionado = '';
    }
  }
  removerSentimento(index: number) {
    this.sentimentoReceita.splice(index, 1);
  }

  adicionarEtapa() {
    this.preparos.push({ modoPreparo: '', ingredientes: [''] });
  }

  removerEtapa(index: number) {
    this.preparos.splice(index, 1);
  }

  adicionarIngrediente(etapaIndex: number) {
    this.preparos[etapaIndex].ingredientes.push('');
  }

  removerIngrediente(etapaIndex: number, ingIndex: number) {
    this.preparos[etapaIndex].ingredientes.splice(ingIndex, 1);
  }
  removerImagem(): void {
    this.imagemReceita = '';
    this.imagemPreview = '';
  }
  trackByIndex(index: number, item: any): number {
  return index;
}
}
