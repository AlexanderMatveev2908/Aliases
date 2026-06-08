import { AuthLayout } from '@/pages/auth_layout/auth-layout';
import { LoginPage } from '@/pages/auth_layout/login_page/login-page';
import { RegisterPage } from '@/pages/auth_layout/register_page/register-page';
import { HomePage } from '@/pages/home_page/home-page';
import { NotFoundPage } from '@/pages/not_found_page/not-found-page';
import { NoticePage } from '@/pages/notice_page/notice-page';
import { ProtectedPage } from '@/pages/protected_page/protected-page';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'notice',
    component: NoticePage,
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'register',
        component: RegisterPage,
      },
      {
        path: 'login',
        component: LoginPage,
      },
    ],
  },
  {
    path: 'protected',
    component: ProtectedPage,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
