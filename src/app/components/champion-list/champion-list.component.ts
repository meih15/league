import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  champions: any[] = [];
  paginatedChampions: any[] = [];  
  currentPage: number = 1;
  itemsPerPage: number = 15;  

  constructor(private championService: ChampionService) { }

  ngOnInit(): void {
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data);
      this.updatePaginatedChampions();  // Set initial pagination
    });
  }

  // Update champions displayed on the current page
  updatePaginatedChampions(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedChampions = this.champions.slice(startIndex, endIndex);
  }

  // Function to handle page change
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedChampions();
  }

  // Function to get total pages
  getTotalPages(): number[] {
    return Array(Math.ceil(this.champions.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }
}
