import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GitSearchComponent } from './git-search/git-search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent}, 
  { path: 'search',
    redirectTo: '/search/angular/1',
    pathMatch: 'full'
  },
  { path: 'search/:query/:page',
    component: GitSearchComponent,
    data: { title: 'Git Repo Search' }
  },
  
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
