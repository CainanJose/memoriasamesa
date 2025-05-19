import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../services/token.service'; // 👈 NOVO

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  rotaAtual: string = '';
  tokenValido: boolean = false;
  menuAberto = false;

  constructor(private router: Router, private tokenService: TokenService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.rotaAtual = event.urlAfterRedirects;
      this.tokenValido = !!this.tokenService.getToken(); // 👈 verifica token
    });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaCriar() {
    this.router.navigate(['/cadastro']);
  }

  logout() {
    this.tokenService.clearToken();
    localStorage.removeItem('usuario'); // 🔥 limpar também os dados do usuário
    this.tokenValido = false;
    this.router.navigate(['/login']);
  }
  

  esconderBotoes(): boolean {
    return this.rotaAtual.includes('/login') || this.rotaAtual.includes('/cadastro');
  }
  abrirMenuLateral() {
    this.menuAberto = true;
  }
  
  fecharMenuLateral() {
    this.menuAberto = false;
  }
  irParaFavoritos() {
    this.router.navigate(['/favoritos']);
    this.fecharMenuLateral();
  }
  menuHamburguerAberto = false;

abrirMenuHamburguer() {
  this.menuHamburguerAberto = true;
}

fecharMenuHamburguer() {
  this.menuHamburguerAberto = false;
}

}
