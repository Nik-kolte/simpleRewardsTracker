import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  constructor(private toastCtrl: ToastController) {}

  async createToast(message) {
    try {
      this.toastCtrl
        .dismiss()
        .then(() => {})
        .catch(() => {});
    } catch (e) {}

    let toast = await this.toastCtrl.create({
      header: message,
      duration: 3000,
      cssClass: "toast-scheme",
      buttons: [
        {
          text: "Ok",
          role: "close",
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    toast.present();
  }
}
