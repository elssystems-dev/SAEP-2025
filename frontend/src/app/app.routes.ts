import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Login } from './page/login/login';
import { Products } from './page/products/products';
import { Stock } from './page/stock/stock';

export const routes: Routes = [
    {path: "home", component: Home},
    {path: "login", component: Login},
    {path: "products", component: Products},
    {path: "stock", component: Stock}
];
