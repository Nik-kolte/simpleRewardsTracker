import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Reward } from "src/app/models/app.context";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-redeem-history",
  templateUrl: "./redeem-history.component.html",
  styleUrls: ["./redeem-history.component.scss"],
})
export class RedeemHistoryComponent implements OnInit {
  redeemedList: Array<Reward> = [];

  constructor(
    private _dataService: DataService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this._dataService.getRewards().subscribe((rewards) => {
      this.redeemedList = rewards;
      this.redeemedList.sort((a: Reward, b: Reward) => {
        return b.date - a.date;
      });
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
