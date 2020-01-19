import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../service/user.service";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "angular-web-storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private local: LocalStorageService
  ) {}

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  openScreenRegister() {
    this.router.navigate(["register"]);
  }

  login() {
    this.userService.login(this.formGroup.value).subscribe(
      user => {
        this.local.set("user", user);
        this.toastr.success("Usuário logado!");
        this.router.navigate(["product"]);
      },
      error => {
        this.toastr.error("E-mail ou senha incorretas");
        console.log(error);
      }
    );
  }
}
