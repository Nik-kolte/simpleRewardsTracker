import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { RedeemHistoryComponent } from "src/app/components/redeem-history/redeem-history.component";
import { HeartPoints, Reward } from "src/app/models/app.context";
import { RewardList } from "src/app/models/constants";
import { DataService } from "src/app/services/data.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-redeem",
  templateUrl: "./redeem.page.html",
  styleUrls: ["./redeem.page.scss"],
})
export class RedeemPage implements OnInit {
  points: HeartPoints = new HeartPoints();
  selectedReward: Reward;
  rewardsList: Array<Reward> = RewardList;

  constructor(
    private _dataService: DataService,
    private _utilService: UtilService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.selectedReward = this.rewardsList[0];

    this._dataService.getHeartPoints().subscribe((points: HeartPoints) => {
      this.points = points;
    });
  }

  async redeemPoints() {
    if (this.selectedReward.cost > this.points.value) {
      this._utilService.createToast("You do not have enough heartpoints :(");
      return;
    }
    const alert = await this.alertCtrl.create({
      header: "Confirm",
      message: "Are you sure you want to spend the rewards?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Yes",
          handler: () => {
            this.confirmRedeem();
          },
        },
      ],
    });
    await alert.present();
  }

  confirmRedeem() {
    this._dataService
      .addRedeemedReward(this.selectedReward)
      .then((isSuccess) => {
        if (isSuccess) {
          this._dataService.UpdateHeartPoints(
            this.points.value + this.selectedReward.cost * -1
          );
          this._dataService.logMessage(
            "Points Redeemed:\nReward: " +
              this.selectedReward.name +
              "\nCost: " +
              this.selectedReward.cost
          );
          this._utilService.createToast("Points Redeemed! Enjoy your treat!!");
        } else {
          this._utilService.createToast("Unable to redeem reward");
        }
      });
  }

  async showRedeemList() {
    const popup = await this.modalCtrl.create({
      component: RedeemHistoryComponent,
    });

    await popup.present();
  }
}
