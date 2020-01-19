import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "src/app/service/product.service";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "angular-web-storage";

@Component({
  selector: "app-confirm-remove",
  templateUrl: "./confirm-remove.component.html",
  styleUrls: ["./confirm-remove.component.css"]
})
export class ConfirmRemoveComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private toastr: ToastrService,
    private local: LocalStorageService
  ) {}

  remove() {
    this.productService.delete(this.local.get("idProduct")).subscribe(
      _ => {
        this.toastr.success("Produto removido com sucesso!");
        this.activeModal.close();
      },
      error => {
        this.toastr.error("Erro ao remover o produto");
        console.log(error);
      }
    );
  }
}
