import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../models/user";
import { GetOtpService } from "../../services/get-otp.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-success",
  templateUrl: "./success.component.html",
  styleUrls: ["./success.component.css"],
})
export class SuccessComponent implements OnInit {
  userFullName: String;

  constructor(private route: ActivatedRoute) {
    this.userFullName = this.route.snapshot.queryParamMap.get("userName");
  }

  ngOnInit(): void {}
}
