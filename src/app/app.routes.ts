import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './ecommerce/product.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    { path:"register", component:RegisterComponent},
    { path:"login", component:LoginComponent},
    { path:"ecommerce", component:ProductComponent, canActivate: [AuthGaurdService], data: { role: 'admin'}},
    { path:"customer", component:CustomerComponent, canActivate: [AuthGaurdService], data: { role: 'user'}},
    { path:'', redirectTo: 'login', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'products', component: ProductListComponent},
    { path: 'details/:id', component: ProductDetailComponent},
    { path: 'cart', component: CartComponent},
];
