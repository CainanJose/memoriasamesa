import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true, // caso esteja usando componentes standalone
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  rotaAtual: string = '';
  constructor(private router: Router) {
    this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.rotaAtual = event.urlAfterRedirects;
    });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaCriar() {
    this.router.navigate(['/cadastro']); // caso queira já preparar o botão "Criar"
  }
  esconderBotoes(): boolean {
    return this.rotaAtual.includes('/login') || this.rotaAtual.includes('/cadastro');
  }
}
