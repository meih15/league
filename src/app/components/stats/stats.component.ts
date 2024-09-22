import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() champion: any;  
  data: any;
  options: any;

  ngOnInit(): void {
    if (this.champion) {
      this.initializeRadarChart();
    }
  }

  initializeRadarChart(): void {
    this.data = {
      labels: ['Attack', 'Defense', 'Magic'],
      datasets: [
        {
          label: `${this.champion.name}'s Stats`,
          data: [this.champion.stats.attackdamage, this.champion.stats.armor, this.champion.stats.spellblock],  
          backgroundColor: 'rgba(255, 140, 0, 0.2)', 
          borderColor: 'rgba(255, 99, 132, 1)',  
          borderWidth: 2
        }
      ]
    };
  
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          min: 1,
          max: 10,
          beginAtZero: true,
          display: true,
          color: '#ffffff'
        },
        angleLines: {
          color: '#ffffff', 
          lineWidth: 2  
        },
        gridLines: {
          color: '#ffffff',  
          lineWidth: 2  
        },
        pointLabels: {
          fontSize: 14,  
          fontColor: '#ffffff' 
        }
      }
    };
  }  
}
