import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChampionService } from '../../services/champion.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = '';
  champions: any[] = [];
  showHelpParagraph: boolean = false;
  showErrorModal: boolean = false;  
  errorMessage: string = '';  

  constructor(private readonly championService: ChampionService, private readonly router: Router, public authService: AuthService) {
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data);
    });
  }

  searchChampion(): void {
    const foundChampion = this.champions.find(champ => champ.name.toLowerCase() === this.searchValue.toLowerCase());
    if (foundChampion) {
      this.router.navigate(['/champion', foundChampion.id]);
    } else {
      this.errorMessage = 'Champion not found. Please try again.';  
      this.showErrorModal = true;  
    }
  }

  // Close the error modal
  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  getRandomChampion(): void {
    const crypto = window.crypto || (window as any).msCrypto; 
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    const randomIndex = array[0] % this.champions.length; 
    const randomChampion = this.champions[randomIndex];
    this.router.navigate(['/champion', randomChampion.id]);
  }


  showHelp(): void {
    this.showHelpParagraph = true;
  }

  hideHelp(): void {
    this.showHelpParagraph = false;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.logoutUser();
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
