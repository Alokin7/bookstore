import { Routes } from '@angular/router';

//Components 
import { LoginComponent } from './components/login/login.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminBookDetailsComponent } from './components/admin/admin-book-details/admin-book-details.component';
import { AdminBookCreateComponent } from './components/admin/admin-book-create/admin-book-create.component';

import { authGuard } from './guards/auth.guard';
import { authAdminGuard } from './guards/auth-admin.guard';


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login Page'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page'
  },
  {
    path: 'books',
    component: BookListComponent,
    title: 'Books Page',
    canActivate: [authGuard]
  },
  {
    path: 'book-details/:id',
    component: BookDetailsComponent,
    title: 'Book details Page',
    canActivate: [authGuard]
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    title: 'Admin panel Page',
    canActivate: [authAdminGuard]
  },
  {
    path: 'admin-book-details/:id',
    component: AdminBookDetailsComponent,
    title: 'Admin Book Details Page',
    canActivate: [authAdminGuard]
  },
  {
    path: 'admin-book-create',
    component: AdminBookCreateComponent,
    title: 'Admin Book Creation Page',
    canActivate: [authAdminGuard]
  },
  {
    path: '**',
    component: NoPageComponent,
    title: 'No Page'
  },
];
