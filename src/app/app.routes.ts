import { Routes } from '@angular/router';
import { ListaReceitasComponent } from './lista-receitas/lista-receitas.component';
import { LoginComponent } from './login/login.component'; // importar o componente
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listareceitas',
    pathMatch: 'full'
  },
  {
    path: 'listareceitas',
    component: ListaReceitasComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component:CadastroComponent
  },
  {
    path: 'cadastroreceita',
    loadComponent: () => import('./cadastro-receita/cadastro-receita.component').then(c => c.CadastroReceitaComponent)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./favoritos/favoritos.component').then(m => m.FavoritosComponent)
  }
  
];