import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() champion: any;  // Input to receive champion data from parent component
  data: any;
  options: any;

  ngOnInit(): void {
    if (this.champion) {
      this.initializeChart();
    }
  }

  initializeChart(): void {
    // Create chart data using champion's stats
    this.data = {
      labels: ['Health', 'Mana', 'Armor', 'Attack Damage', 'Magic Resist', 'Move Speed'],
      datasets: [
        {
          label: this.champion.name + ' Stats',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: [
            this.champion.stats.hp,
            this.champion.stats.mp,
            this.champion.stats.armor,
            this.champion.stats.attackdamage,
            this.champion.stats.spellblock,
            this.champion.stats.movespeed
          ]
        }
      ]
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }
}
