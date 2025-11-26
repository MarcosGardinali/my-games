import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { JogosService, Jogo } from '../services/jogos.service';
import { GameActionsService } from '../shared/game-actions.service';
import { ModalSelectComponent } from '../modal-select/modal-select.component';

@Component({
  selector: 'app-lista-desejos',
  templateUrl: './lista-desejos.page.html',
  styleUrls: ['../jogos/jogos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListaDesejosPage implements OnInit {
  jogos: Jogo[] = [];

  constructor(
    private jogosService: JogosService,
    private gameActions: GameActionsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadJogos();
  }

  ionViewWillEnter() {
    this.loadJogos();
  }

  loadJogos() {
    this.jogosService.getJogosPorStatus('desejo').subscribe({
      next: (jogos) => this.jogos = jogos,
      error: (err) => console.error('Erro ao carregar jogos:', err)
    });
  }

  async marcarComoComprado(jogo: Jogo) {
    await this.gameActions.marcarComoComprado(jogo, () => this.loadJogos());
  }

  async editJogo(jogo: Jogo) {
    await this.gameActions.editJogo(jogo, () => this.loadJogos());
  }

  async deleteJogo(jogo: Jogo) {
    await this.gameActions.deleteJogo(jogo, () => this.loadJogos());
  }

  async addJogo() {
    const modal = await this.modalController.create({
      component: ModalSelectComponent
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm' && result.data) {
        this.jogosService.createJogo(result.data).subscribe({
          next: () => this.loadJogos(),
          error: (err) => console.error('Erro ao salvar jogo:', err)
        });
      }
    });
    
    await modal.present();
  }

  onImageError(event: any) {
    const img = event.target;
    const container = img.parentElement;
    img.style.display = 'none';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'game-image-placeholder';
    placeholder.innerHTML = '<ion-icon name="game-controller-outline"></ion-icon>';
    container.appendChild(placeholder);
  }
}