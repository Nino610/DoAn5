import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FileNotFoundComponent } from './shared/file-not-found/file-not-found.component';
import { AuthGuard } from './lib/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { AvatarComponent } from './user/avatar/avatar.component';
import { RegisterComponent } from './user/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ThongkeComponent } from './thongke/thongke.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    // canActivate: [AuthGuard],
    // data: { permittedRoles: ['1'] },
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'Avatar',
    component: AvatarComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'thongke',
    component: ThongkeComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['2'] },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['1'] },
  },
  {
    path: '**',
    component: FileNotFoundComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
