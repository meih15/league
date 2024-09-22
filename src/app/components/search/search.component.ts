import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { ChampionService } from '../../services/champion.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = '';
  champions: any[] = [];
  showHelpParagraph: boolean = false;

  constructor(private championService: ChampionService, private router: Router) { 
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data); 
    });
  }

  // Function to handle search input
  searchChampion(): void {
    if (this.searchValue.toLowerCase() === 'wukong') {
      this.searchValue = 'MonkeyKing';  
    }
    
    const foundChampion = this.champions.find(champ => champ.name.toLowerCase() === this.searchValue.toLowerCase());
    if (foundChampion) {
      // Navigate to the champion detail page
      this.router.navigate(['/champion', foundChampion.id]);
    } else {
      console.log('Champion not found');
    }
  }

  // Function to pick a random champion and navigate to its detail page
  getRandomChampion(): void {
    const randomIndex = Math.floor(Math.random() * this.champions.length);
    const randomChampion = this.champions[randomIndex];
    // Navigate to the champion detail page
    this.router.navigate(['/champion', randomChampion.id]);
  }

  showHelp(): void {
    this.showHelpParagraph = true;
  }

  hideHelp(): void {
    this.showHelpParagraph = false;
  }
}
