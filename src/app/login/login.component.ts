import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ReceitasService } from '../services/receitas.service';
import { UsuarioService } from '../services/usuario.service';

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
    private router: Router,
    private usuarioService: UsuarioService
  ) {}
  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
  
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {

        const token = res?.access_token;

        if (token) {
          this.tokenService.setToken(token);

          // 🔄 Buscar dados do usuário
          this.usuarioService.getUserData().subscribe({
            next: (usuario) => {

              localStorage.setItem('usuario', JSON.stringify(usuario));
              if (usuario.id) {
                localStorage.setItem('userId', usuario.id);
              }
              if (usuario.username) {
                localStorage.setItem('username', usuario.username);
              }

              this.router.navigate(['/listareceitas']);
            },
            error: () => {
              this.mensagem = 'Erro ao buscar dados do usuário.';
            }
          });
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
