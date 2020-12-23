import { Component, OnInit } from "@angular/core";
import { AlertController, PopoverController } from "@ionic/angular";
import { NewtaskupdateComponent } from "src/app/components/newtaskupdate/newtaskupdate.component";
import { HeartPoints, Task } from "src/app/models/app.context";
import { DataService } from "src/app/services/data.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.page.html",
  styleUrls: ["./tracker.page.scss"],
})
export class TrackerPage implements OnInit {
  points: HeartPoints = new HeartPoints();
  taskList: Array<Task> = [];

  constructor(
    private _dataService: DataService,
    private popCtrl: PopoverController,
    private alertCtrl: AlertController,
    private _utilService: UtilService
  ) {}

  ngOnInit() {
    this._dataService.getTasks().subscribe((tasks) => {
      this.taskList = tasks;
      this.taskList.sort((a: Task, b: Task) => {
        return b.date - a.date;
      });
    });

    this._dataService.getHeartPoints().subscribe((points: HeartPoints) => {
      this.points = points;
    });
  }

  modifyPoints() {
    // let heartpoints = 0;
    // this._dataService.UpdateHeartPoints(heartpoints);
    // this._dataService.logMessage(
    //   "Heart points manually changed to : " + heartpoints + " points"
    // );
    this._utilService.createToast("Ignore for Now");
  }

  async addNewTaskUpdate() {
    const popup = await this.popCtrl.create({
      component: NewtaskupdateComponent,
      cssClass: "custom-popover",
    });

    await popup.present();
  }

  async deleteTask(task, slidingItem) {
    const alert = await this.alertCtrl.create({
      header: "Warning",
      message: "Do you want to delete this task from tracker?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            slidingItem.close();
          },
        },
        {
          text: "Yes",
          handler: () => {
            this.confirmDelete(task);
          },
        },
      ],
    });
    await alert.present();
  }

  confirmDelete(task) {
    this._dataService.deleteTask(task.id).then(() => {
      let points = this.points?.value ? this.points.value : 0;
      this._dataService.UpdateHeartPoints(points + task.points * -1);
      this._utilService.createToast("Task track deleted");
      this._dataService.logMessage(
        "Task '" + task.message + "' was deleted ( -" + task.points + " points)"
      );
    });
  }
}
