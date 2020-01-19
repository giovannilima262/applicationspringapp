import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/app/service/product.service";
import { LocalStorageService } from "angular-web-storage";

@Component({
  selector: "app-register-product",
  templateUrl: "./register-product.component.html",
  styleUrls: ["./register-product.component.css"]
})
export class RegisterProductComponent {
  formGroup: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private local: LocalStorageService
  ) {
    this.formGroup = this._formBuilder.group({
      user: [this.local.get("user")],
      name: ["", Validators.required],
      description: ["", Validators.required],
      price: [null, Validators.required]
    });
    if (this.local.get("idProduct") != null) {
      this.findById();
    }
  }

  findById() {
    this.productService.findById(this.local.get("idProduct")).subscribe(
      data => {
        let product: Product = data;
        this.formGroup = this._formBuilder.group({
          id: [product.id],
          user: [product.user],
          name: [product.name, Validators.required],
          description: [product.description, Validators.required],
          price: [product.price, Validators.required]
        });
      },
      error => {
        this.toastr.error("Erro ao tentar editar o produto");
        this.activeModal.close();
        console.log(error);
      }
    );
  }

  addProduct() {
    if (!this.formGroup.valid) {
      this.toastr.error("Campos com * são obrigatórios");
      return;
    } else if (this.formGroup.value.price == 0) {
      this.toastr.error("O preço deve ser maior que zero");
      return;
    }
    this.productService.save(this.formGroup.value).subscribe(
      _ => {
        if (this.local.get("idProduct") != null) {
          this.toastr.success("Produto editado com sucesso!");
        } else {
          this.toastr.success("Produto registrado com sucesso!");
        }

        this.activeModal.close();
      },
      error => {
        this.toastr.error("Erro ao registrar o produto.");
        console.log(error);
      }
    );
  }
}
