import { Component, OnInit } from "@angular/core";
import { Log } from "src/app/models/app.context";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.page.html",
  styleUrls: ["./log.page.scss"],
})
export class LogPage implements OnInit {
  logList: Array<Log> = [];
  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getLogs().subscribe((logs) => {
      this.logList = logs;
      this.logList.sort((a: Log, b: Log) => {
        return b.date - a.date;
      });
    });
  }
}
