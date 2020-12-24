import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TracknewComponent } from "./tracknew/tracknew.component";
import { UpdatepointsComponent } from "./updatepoints/updatepoints.component";
import { NewtaskupdateComponent } from "./newtaskupdate/newtaskupdate.component";
import { RedeemHistoryComponent } from "./redeem-history/redeem-history.component";

@NgModule({
  declarations: [
    TracknewComponent,
    UpdatepointsComponent,
    NewtaskupdateComponent,
    RedeemHistoryComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [
    TracknewComponent,
    UpdatepointsComponent,
    NewtaskupdateComponent,
    RedeemHistoryComponent,
  ],
})
export class ComponentsModule {}
