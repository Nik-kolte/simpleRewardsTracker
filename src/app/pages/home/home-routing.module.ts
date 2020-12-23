import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "tracker",
        loadChildren: () =>
          import("../tracker/tracker.module").then((m) => m.TrackerPageModule),
      },
      {
        path: "redeem",
        loadChildren: () =>
          import("../redeem/redeem.module").then((m) => m.RedeemPageModule),
      },
      {
        path: "log",
        loadChildren: () =>
          import("../log/log.module").then((m) => m.LogPageModule),
      },
      {
        path: "",
        redirectTo: "tracker",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
