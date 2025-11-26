import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Jogo } from '../services/jogos.service';

@Component({
  selector: 'app-jogo-form-modal',
  templateUrl: './jogo-form-modal.component.html',
  styleUrls: ['./jogo-form-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class JogoFormModalComponent {
  @Input() isEdit = false;
  @Input() jogoData?: Jogo;
  
  jogo: any = {
    nome: '',
    descricao: '',
    ano: new Date().getFullYear(),
    plataforma: '',
    foto_url: '',
    status: 'possuo'
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.isEdit && this.jogoData) {
      this.jogo = { ...this.jogoData };
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    if (this.isValid()) {
      this.modalController.dismiss(this.jogo, 'save');
    }
  }

  isValid(): boolean {
    return !!(this.jogo.nome?.trim() && 
              this.jogo.descricao?.trim() && 
              this.jogo.ano && 
              this.jogo.plataforma?.trim() &&
              (!this.isEdit ? this.jogo.status : true));
  }
}