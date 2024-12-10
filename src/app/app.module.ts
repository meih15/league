import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChampionListComponent } from './components/champion-list/champion-list.component';
import { ChampionDetailComponent } from './components/champion-detail/champion-detail.component';
import { CardModule } from 'primeng/card'; 
import { SearchComponent } from './components/search/search.component';
import { StatsComponent } from './components/stats/stats.component';
import { ChartModule } from 'primeng/chart';  
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { FavoritesService } from './services/favorites.service';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionListComponent,
    ChampionDetailComponent,
    SearchComponent,
    StatsComponent,
    LoginComponent,
    RegisterComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    CardModule,
    ChartModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    FavoritesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
