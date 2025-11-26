import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { JogosService, Jogo } from '../services/jogos.service';

@Injectable({
  providedIn: 'root'
})
export class GameActionsService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private jogosService: JogosService
  ) { }

  async editJogo(jogo: Jogo, onSuccess: () => void) {
    const alert = await this.alertController.create({
      header: 'Editar Jogo',
      cssClass: 'game-form-alert',
      inputs: [
        { 
          name: 'nome', 
          type: 'text', 
          value: jogo.nome,
          placeholder: 'Nome do jogo',
          attributes: { required: true, maxlength: 100 }
        },
        { 
          name: 'descricao', 
          type: 'textarea', 
          value: jogo.descricao,
          placeholder: 'Descrição do jogo',
          attributes: { rows: 3 }
        },
        { 
          name: 'ano', 
          type: 'number', 
          value: jogo.ano?.toString(),
          placeholder: 'Ano de lançamento',
          attributes: { min: 1970, max: new Date().getFullYear() + 5 }
        },
        { 
          name: 'plataforma', 
          type: 'text', 
          value: jogo.plataforma,
          placeholder: 'Plataforma',
          attributes: { maxlength: 50 }
        },
        { 
          name: 'foto_url', 
          type: 'url', 
          value: jogo.foto_url || '',
          placeholder: 'URL da foto do jogo (opcional)',
          attributes: { maxlength: 500 }
        }
      ],
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Salvar',
          cssClass: 'alert-button-confirm',
          handler: (data) => {
            if (data.nome?.trim() && data.descricao?.trim() && data.ano && data.plataforma?.trim()) {
              const jogoAtualizado = {
                nome: data.nome.trim(),
                descricao: data.descricao.trim(),
                ano: parseInt(data.ano),
                plataforma: data.plataforma.trim(),
                foto_url: null as string | null
              };
              
              if (data.foto_url?.trim()) {
                this.isValidImageUrl(data.foto_url.trim()).then(isValid => {
                  jogoAtualizado.foto_url = isValid ? data.foto_url.trim() : null;
                  this.jogosService.updateJogo(jogo.id!, jogoAtualizado).subscribe({
                    next: () => {
                      onSuccess();
                      if (!isValid && data.foto_url?.trim()) {
                        this.showToast('URL da imagem inválida, jogo salvo sem foto');
                      }
                    },
                    error: (err) => console.error('Erro ao atualizar jogo:', err)
                  });
                });
              } else {
                this.jogosService.updateJogo(jogo.id!, jogoAtualizado).subscribe({
                  next: () => onSuccess(),
                  error: (err) => console.error('Erro ao atualizar jogo:', err)
                });
              }
              return true;
            } else {
              this.showToast('Por favor, preencha todos os campos');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteJogo(jogo: Jogo, onSuccess: () => void) {
    const alert = await this.alertController.create({
      header: 'CONFIRMAR EXCLUSÃO',
      message: `Tem certeza que deseja excluir o jogo "${jogo.nome}"? Esta ação não pode ser desfeita.`,
      cssClass: 'delete-alert',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Excluir',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.jogosService.deleteJogo(jogo.id!).subscribe({
              next: () => {
                onSuccess();
                this.showToast(`Jogo "${jogo.nome}" excluído com sucesso`);
              },
              error: (err) => {
                console.error('Erro ao excluir jogo:', err);
                this.showToast('Erro ao excluir jogo');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async marcarComoComprado(jogo: Jogo, onSuccess: () => void) {
    const alert = await this.alertController.create({
      header: 'MARCAR COMO COMPRADO',
      message: `Marcar "${jogo.nome}" como comprado? O jogo sairá da lista de desejos.`,
      cssClass: 'delete-alert',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.jogosService.marcarComoComprado(jogo.id!).subscribe({
              next: () => {
                onSuccess();
                this.showToast(`"${jogo.nome}" marcado como comprado!`);
              },
              error: (err) => {
                console.error('Erro ao marcar como comprado:', err);
                this.showToast('Erro ao marcar como comprado');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  private isValidImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!url || !url.trim()) {
        resolve(false);
        return;
      }
      
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      setTimeout(() => resolve(false), 5000);
    });
  }
}