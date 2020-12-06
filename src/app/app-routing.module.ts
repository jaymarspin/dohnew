import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component'
import { AdminHomeComponent } from './pages/admin-home/admin-home.component'
import { AddcertComponent } from './pages/admin-home/addcert/addcert.component'
import { CertlistingComponent } from './pages/admin-home/certlisting/certlisting.component'
import { CertComponent } from './pages/client-home/cert/cert.component'
import { ClientHomeComponent } from './pages/client-home/client-home.component'
import { CertificateComponent } from './pages/certificate/certificate.component'
import { UsersComponent } from '../app/pages/admin-home/users/users.component'
import { ReportComponent } from '../app/report/report.component'
import {AddmedicalComponent} from '../app/pages/addmedical/addmedical.component'
import { ExtensionComponent} from '../app/pages/admin-home/extension/extension.component'
import {ViewcertComponent} from '../app/pages/admin-home/viewcert/viewcert.component'
const routes: Routes = [
  { 
    path: '',
    redirectTo: 'sign',
    pathMatch: 'full'
  },
  {path: "certificate/:id", component: CertificateComponent},
  {path: "report", component: ReportComponent},
  { path: 'sign', component: SigninComponent},
  { path: 'addmedical', component: AddmedicalComponent},
  { path: 'admin-home', component: AdminHomeComponent,children: [
      {  path: '',
        redirectTo: 'certlisting',
        pathMatch: 'full'
      },{ path: 'addcert', component: AddcertComponent},
      { path: 'certlisting', component: CertlistingComponent},
      { path: 'user', component: UsersComponent},
      { path: 'extension', component: ExtensionComponent},
      
  ]},{path: 'client-home', component: ClientHomeComponent,children:[
    {  path: '',
    redirectTo: 'cert',
    pathMatch: 'full'
  },{ path: 'cert/:id', component: CertComponent},
  { path: 'cert', component: CertComponent},

  
  
  ]},{ path: 'certview', component: ViewcertComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
