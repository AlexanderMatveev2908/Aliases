import { HomePage } from '@/pages/home_page/home-page';
import { NotFoundPage } from '@/pages/not_found_page/not-found-page';
import { NoticePage } from '@/pages/notice_page/notice-page';
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
    path: '**',
    component: NotFoundPage,
  },
];
