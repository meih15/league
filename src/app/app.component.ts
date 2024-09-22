import { Component } from '@angular/core';
import { ChampionService } from './services/champion.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'league-of-legends';
  champions: any[] = []; 

  constructor(private championService: ChampionService) {
    this.loadChampions();
  }

  loadChampions(): void {
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data); 
    });
  }

}
