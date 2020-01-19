import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { RegisterProductComponent } from "./register-product/register-product.component";
import { LocalStorageService } from "angular-web-storage";
import { Router } from "@angular/router";
import { ConfirmRemoveComponent } from "./confirm-remove/confirm-remove.component";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  products: Array<Product> = [];
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private local: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    let user: User = this.local.get("user");
    if (user == null) {
      this.toastr.error("Erro, o usuário não esta logado!");
      this.logout();
      return;
    }
    this.productService.findAllByIdUser(user.id).subscribe(
      data => (this.products = data),
      error => {
        this.toastr.error("Erro ao consultar produtos");
        console.log(error);
      }
    );
  }

  logout() {
    this.local.clear();
    this.router.navigate(["login"]);
  }

  open() {
    this.local.set("idProduct", null);
    this.modalService.open(RegisterProductComponent).result.then(_ => {
      this.findAll();
    });
  }

  edit(id: number) {
    this.local.set("idProduct", id);
    let modalRef = this.modalService.open(RegisterProductComponent);
    modalRef.result.then(_ => {
      this.findAll();
    });
  }

  remove(id: number) {
    this.local.set("idProduct", id);
    let modalRef = this.modalService.open(ConfirmRemoveComponent);
    modalRef.result.then(_ => {
      this.findAll();
    });
  }
}
