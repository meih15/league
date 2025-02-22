import { Component, HostListener} from '@angular/core';
import { ChampionService } from './services/champion.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'league-of-legends';
  champions: any[] = []; 
  showBackToTop: boolean = false;

  constructor(private readonly championService: ChampionService) {
    this.loadChampions();
  }

  loadChampions(): void {
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data); 
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffset = window.pageYOffset || document.documentElement.scrollTop;
    this.showBackToTop = yOffset > 200;
  }

  // Scroll to top functionality
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
