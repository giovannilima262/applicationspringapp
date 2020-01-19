import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { UserService } from "./service/user.service";
import { registerLocaleData } from "@angular/common";
import localePtBr from "@angular/common/locales/pt";
import { DataService } from "./service/data.service";
import { HttpClientModule } from "@angular/common/http";
import { AngularWebStorageModule } from "angular-web-storage";
import { ProductComponent } from "./product/product.component";
import { ProductService } from "./service/product.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RegisterProductComponent } from "./product/register-product/register-product.component";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ConfirmRemoveComponent } from "./product/confirm-remove/confirm-remove.component";

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    RegisterProductComponent,
    ConfirmRemoveComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularWebStorageModule,
    NgbModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
    DataService,
    UserService,
    ProductService
  ],
  entryComponents: [RegisterProductComponent, ConfirmRemoveComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
