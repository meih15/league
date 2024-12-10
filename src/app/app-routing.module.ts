import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionListComponent } from './components/champion-list/champion-list.component';
import { ChampionDetailComponent } from './components/champion-detail/champion-detail.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: ChampionListComponent }, // Home page
  { path: 'champion/:id', component: ChampionDetailComponent }, // Champion details
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
