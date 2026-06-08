import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'notice',
    renderMode: RenderMode.Server,
  },
  {
    path: 'auth',
    renderMode: RenderMode.Client,
  },
  {
    path: 'protected',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
