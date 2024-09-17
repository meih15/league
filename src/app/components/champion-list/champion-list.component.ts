import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../services/champion.service';  

@Component({
  selector: 'app-champion-list',
  templateUrl: './champion-list.component.html',
  styleUrls: ['./champion-list.component.scss']
})
export class ChampionListComponent implements OnInit {
  champions: any[] = [];

  constructor(private championService: ChampionService) { }

  ngOnInit(): void {
    this.championService.getChampions().subscribe(data => {
      this.champions = Object.values(data.data);
    });
  }
}

