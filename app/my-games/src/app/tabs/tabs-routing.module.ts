import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'jogos',
        loadChildren: () => import('../jogos/jogos.module').then(m => m.JogosPageModule)
      },
      {
        path: 'meus-jogos',
        loadComponent: () => import('../meus-jogos/meus-jogos.page').then(m => m.MeusJogosPage)
      },
      {
        path: 'lista-desejos',
        loadComponent: () => import('../lista-desejos/lista-desejos.page').then(m => m.ListaDesejosPage)
      },
      {
        path: '',
        redirectTo: '/tabs/jogos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/jogos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
