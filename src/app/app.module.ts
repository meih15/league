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


@NgModule({
  declarations: [
    AppComponent,
    ChampionListComponent,
    ChampionDetailComponent,
    SearchComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    CardModule,
    ChartModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
