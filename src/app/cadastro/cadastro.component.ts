import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule,NavbarComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  mensagem = '';

  constructor(private usuarioService: UsuarioService,private router: Router) {}

  emailValido(): boolean {
    return /^[\w.-]+@(gmail|outlook)\.com$/.test(this.email);
  }

  senhaValida(): boolean {
    return /^[A-Z][\w\d@$!%*?&]{7,}$/.test(this.senha);
  }

  cadastrar() {
    if (this.emailValido() && this.senhaValida()) {
      const dados = {
        username: this.nome,     
        email: this.email,
        password: this.senha      
      };

      console.log('Enviando dados para o backend:', dados);
      this.usuarioService.cadastrar(dados).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (erro) => {
          const msg = erro?.error?.detail || '';
          if (msg.includes('Username or email already exists')) {
            this.mensagem = 'Usuário ou email já cadastrado.';
          } else {
            this.mensagem = 'Erro ao cadastrar. Tente novamente.';
          }
        
          // ⏱️ torna a mensagem temporária por 4 segundos
          setTimeout(() => {
            this.mensagem = '';
          }, 4000);
        }
      });
    } else {
      this.mensagem = '';
    }
  }
}
