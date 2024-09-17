import { Component } from '@angular/core';
import { ChampionService } from './services/champion.service'; // Import ChampionService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'league-of-legends';
  champions: any[] = []; // Store list of champions

  constructor(private championService: ChampionService) {
    this.loadChampions();
  }

  // Load all champions when the app starts
  loadChampions(): void {
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data); // Assuming 'data.data' holds the champions
    });
  }

  // // Randomly select a champion and display it
  // getRandomChampion(): void {
  //   if (this.champions.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * this.champions.length);
  //     const randomChampion = this.champions[randomIndex];
  //     console.log('Random Champion:', randomChampion); // Log the random champion (replace with actual display logic)
  //   } else {
  //     console.log('No champions loaded yet.');
  //   }
  // }
}
