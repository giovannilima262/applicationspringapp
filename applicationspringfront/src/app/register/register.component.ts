import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  openScreenLogin() {
    this.router.navigate(["login"]);
  }

  save() {
    if (!this.formGroup.valid) {
      this.toastr.error("Campos com * são obrigatórios");
      return;
    }
    this.userService.save(this.formGroup.value).subscribe(
      _ => {
        this.toastr.success("Usuário salvo com sucesso!");
        this.openScreenLogin();
        this.formGroup.reset();
      },
      error => {
        this.toastr.error("Error ao registrar!");
        console.log(error);
      }
    );
  }
}
