import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ModalSelectComponent {
  jogo = {
    nome: '',
    descricao: '',
    ano: new Date().getFullYear(),
    plataforma: '',
    foto_url: '',
    status: 'possuo'
  };

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  confirm() {
    if (this.jogo.nome && this.jogo.descricao && this.jogo.plataforma) {
      this.modalController.dismiss(this.jogo, 'confirm');
    }
  }
}