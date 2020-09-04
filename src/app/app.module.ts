import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/components/home/home.component";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GetOtpService } from "./core/services/get-otp.service";
import { HttpHandlerService } from "./core/services/http-handler.service";
import { VerifyOtpService } from "./core/services/verify-otp.service";
import { SuccessComponent } from "./core/components/success/success.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent, HomeComponent, SuccessComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: "verify", component: HomeComponent },
      { path: "success", component: SuccessComponent },
    ]),
  ],
  providers: [GetOtpService, VerifyOtpService, HttpHandlerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
