import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampionService } from '../../services/champion.service';

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.scss']
})
export class ChampionDetailComponent implements OnInit {
  champion: any;
  champKey: string = '';
  modifiedStats: any = {}; 
  selectedLevel: number = 1; 
  levels: number[] = [];
  showErrorModal: boolean = false; 
  errorMessage: string = ''; 
  selectedSkin: number = 0;  


  @ViewChild('abilityDescription', { static: false }) abilityDescription!: ElementRef;
  @ViewChild('abilityName', { static: false }) abilityName!: ElementRef;
  @ViewChild('videoSource', { static: false }) videoSource!: ElementRef;
  @ViewChild('source', { static: false }) source!: ElementRef;
  
  constructor(
    private championService: ChampionService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}
  
  ngOnInit(): void {
    const championId = this.route.snapshot.paramMap.get('id') || '';

    this.championService.getChampions().subscribe(data => {
      try {
        this.champion = data.data[championId];
        if (!this.champion) {
          throw new Error('Champion does not exist');
        }
        this.champKey = this.champion.key.padStart(4, '0');
        this.modifiedStats = { ...this.champion.stats }; 

      } catch (error) {
        this.errorMessage = 'Champion does not exist, check for spelling?';
        this.showErrorModal = true; 
      }
    });
    this.levels = Array.from({ length: 18 }, (_, i) => i + 1);

    this.route.params.subscribe(params => {
      const championId = params['id'];
      this.loadChampion(championId); 
    });

  }

  ngAfterViewInit(): void {
    this.showAbility('passive'); 
  }
  
  loadChampion(championId: string): void {
    this.championService.getChampions().subscribe(data => {
      try {
        this.champion = data.data[championId];
        if (!this.champion) {
          throw new Error('Champion does not exist');
        }
        this.champKey = this.champion.key.padStart(4, '0');
        this.modifiedStats = { ...this.champion.stats };
        
        
        this.showAbility('passive'); 
      } catch (error) {
        this.errorMessage = 'Champion does not exist, check for spelling?';
        this.showErrorModal = true;
      }
    });
  }
  

  // Close the error modal
  closeErrorModal(): void {
    this.showErrorModal = false;
  }

  // Method to change stats by level
  changeStatByLevel(level: number): void {
    if (level === 1) {
      this.modifiedStats = { ...this.champion.stats };
    } else {
      let updatedStats = { ...this.champion.stats };
      updatedStats = this.addStats(updatedStats, level);
      this.modifiedStats = updatedStats;
    }
  }

  // Apply level-based stat increments
  addStats(dupObj: any, value: number): any {
    dupObj.hp = Math.round(dupObj.hp + dupObj.hpperlevel * value);
    dupObj.mp = Math.round(dupObj.mp + dupObj.mpperlevel * value);
    dupObj.armor = Math.round(dupObj.armor + dupObj.armorperlevel * value);
    dupObj.spellblock = Math.round(dupObj.spellblock + dupObj.spellblockperlevel * value);
    dupObj.mpregen = Math.round(dupObj.mpregen + dupObj.mpregenperlevel * value);
    dupObj.hpregen = Math.round(dupObj.hpregen + dupObj.hpregenperlevel * value);
    dupObj.attackdamage = Math.round(dupObj.attackdamage + dupObj.attackdamageperlevel * value);
    dupObj.attackspeed = Math.round(
      dupObj.attackspeed * (1 + (dupObj.attackspeedperlevel * value) / 100)
    );
    return dupObj;
  }


  // Methods for abilities (passive, Q, W, E, R)
  showAbility(abilityType: string, abilityIndex: number = -1): void {
    const checkViewChildElements = () => {
      if (this.abilityDescription && this.abilityName && this.videoSource && this.source) {
        if (abilityType === 'passive') {
          this.abilityDescription.nativeElement.innerText = this.champion.passive.description;
          this.abilityName.nativeElement.innerText = this.champion.passive.name;
          this.source.nativeElement.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${this.champKey}/ability_${this.champKey}_P1.webm`;
        } else if (abilityIndex >= 0) {
          this.abilityDescription.nativeElement.innerText = this.champion.spells[abilityIndex].description.replace(/<br\s*\/?>/gi, "");
          this.abilityName.nativeElement.innerText = this.champion.spells[abilityIndex].name;
          this.source.nativeElement.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${this.champKey}/ability_${this.champKey}_${abilityType.toUpperCase()}1.webm`;
        }
        // Ensure the video is reloaded
        this.videoSource.nativeElement.load();
        
        // Play the video with error handling for aborts
        this.videoSource.nativeElement.play().catch((error: DOMException) => {
          if (error.name !== 'AbortError') {
            console.error('Video play was interrupted for another reason:', error);
          }
        });
      } else {
        // Retry after a short delay if the elements are not available
        setTimeout(checkViewChildElements, 50);
      }
    };
  
    // Start checking
    checkViewChildElements();
  }
  

  // Method to get the ability icon URL
  getAbilityIconUrl(abilityType: string, abilityIndex: number = -1): string {
    if (abilityType === 'passive') {
      return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/passive/${this.champion.passive.image.full}`;
    } else if (abilityIndex >= 0) {
      return `https://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${this.champion.spells[abilityIndex].id}.png`;
    }
    return '';
  }

  


  // Method to generate the Skin URL based on the index of the skin button
  getSkinImageUrl(index: number): string {
    const championName = this.champion.id;  // Use champion's 'id' like 'Ekko'
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${index}.jpg`;
  }

  // Method for switching skins based on index
  changeSkin(index: number): void {
    this.selectedSkin = index;  
  }
}
