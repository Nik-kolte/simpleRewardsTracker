import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PopoverController } from "@ionic/angular";
import { HeartPoints, Task } from "src/app/models/app.context";
import { DataService } from "src/app/services/data.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-newtaskupdate",
  templateUrl: "./newtaskupdate.component.html",
  styleUrls: ["./newtaskupdate.component.scss"],
})
export class NewtaskupdateComponent implements OnInit {
  isSubmitted: boolean = false;
  newTaskForm: FormGroup;
  totalPoints: HeartPoints = new HeartPoints();
  points: Array<number> = [1, 2, 3, 4, 5];

  constructor(
    private FormBuilder: FormBuilder,
    private _utilService: UtilService,
    private _dataService: DataService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.newTaskForm = this.FormBuilder.group({
      message: ["", [Validators.required]],
      points: [this.points[0], Validators.required],
    });

    this._dataService.getHeartPoints().subscribe((points: HeartPoints) => {
      this.totalPoints = points;
    });
  }

  addNewTask() {
    if (this.newTaskForm.invalid) {
      this._utilService.createToast("Please fill in all the details");
      return;
    }

    let task = new Task();
    task.message = this.newTaskForm.get("message").value;
    task.points = this.newTaskForm.get("points").value;
    task.date = new Date();

    this._dataService.addTask(task).then((isSuccess) => {
      if (isSuccess) {
        let points = this.totalPoints?.value ? this.totalPoints.value : 0;
        this._dataService.UpdateHeartPoints(points + task.points);
        this._dataService.logMessage(
          "Task Completed:\n" + task.message + "\nPoints added: " + task.points
        );
        this._utilService.createToast("Task Completed Successfully! Congrats");
        this.popCtrl.dismiss();
      } else {
        this._utilService.createToast(
          "Something Went Wrong, Please Try Again.."
        );
      }
    });
  }
}
