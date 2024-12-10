import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { ChampionService } from '../../services/champion.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = []; 
  allChampions: any = {}; 

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private championService: ChampionService
  ) {}

  ngOnInit(): void {
    this.loadFavorites(); 
  }

  loadFavorites(): void {
    const token = this.authService.getToken();
    if (!token) return;

    // First, load all champions
    this.championService.getChampions().subscribe({
      next: (data) => {
        this.allChampions = data.data; 
        console.log('All champions loaded:', this.allChampions);

        // Then, load the user's favorites
        this.favoritesService.getFavorites().subscribe({
          next: (data) => {
            console.log('Favorites loaded:', data);

            // Map the favorite champion IDs to full champion details
            this.favorites = data.map((favorite: any) => ({
              ...favorite,
              details: this.allChampions[favorite.championId], 
            }));
            console.log('Mapped favorites:', this.favorites);
          },
          error: (err) => {
            console.error('Failed to load favorites:', err);
          },
        });
      },
      error: (err) => {
        console.error('Failed to load champions:', err);
      },
    });
  }

  removeFavorite(championId: string): void {
    this.favoritesService.removeFavorite(championId).subscribe({
      next: () => {
        // Filter out the removed favorite and update the UI
        this.favorites = this.favorites.filter(fav => fav.championId !== championId);
        console.log(`Favorite with ID ${championId} removed.`);
      },
      error: (err) => {
        console.error('Failed to remove favorite:', err);
      },
    });
  }

  getChampionImage(championId: string): string {
    const champion = this.allChampions[championId];
    return champion ? `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champion.image.full}` : '';
  }
}
