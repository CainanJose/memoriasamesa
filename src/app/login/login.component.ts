import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  mensagem = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
  
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('🧪 RESPOSTA DO BACKEND:', res);
        const token = res?.access_token;
        if (token) {
          this.tokenService.setToken(token);
          this.router.navigate(['/listareceitas']);
        } else {
          this.mensagem = 'Usuário não encontrado.';
          setTimeout(() => {
            this.mensagem = '';
          }, 4000);
        }
      },
      error: (err) => {
        const mensagemBackend = err?.error?.error || 'Credenciais inválidas!';
        this.mensagem = mensagemBackend;
        setTimeout(() => {
          this.mensagem = '';
        }, 4000);
      }
    });
  }
}
