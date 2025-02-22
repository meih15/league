import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesLocalService {
  private readonly storageKey = 'userFavorites';

  constructor() {}

  // Get all favorites for a specific user
  getFavorites(userId: string): string[] {
    const data = localStorage.getItem(this.storageKey);
    const favorites = data ? JSON.parse(data) : {};
    return favorites[userId] || [];
  }

  // Add a favorite for a user
  addFavorite(userId: string, championId: string): void {
    const data = localStorage.getItem(this.storageKey);
    const favorites = data ? JSON.parse(data) : {};

    if (!favorites[userId]) {
      favorites[userId] = [];
    }

    // Ensure the champion is unique
    if (!favorites[userId].includes(championId)) {
      favorites[userId].push(championId);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  // Remove a favorite for a user
  removeFavorite(userId: string, championId: string): void {
    const data = localStorage.getItem(this.storageKey);
    const favorites = data ? JSON.parse(data) : {};

    if (favorites[userId]) {
      favorites[userId] = favorites[userId].filter((id: string) => id !== championId);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  // Check if a champion is favorited by a user
  isFavorited(userId: string, championId: string): boolean {
    const favorites = this.getFavorites(userId);
    return favorites.includes(championId);
  }
}
