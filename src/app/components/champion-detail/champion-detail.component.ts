import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampionService } from '../../services/champion.service';

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.scss']
})
export class ChampionDetailComponent implements OnInit {
  champion: any;
  champKey: string = '';
  selectedSkin: string = '';
  modifiedStats: any = {}; // Store modified stats for change by level
  selectedLevel: number = 1; // Default level
  levels: number[] = []; // Array to store levels 1-18
  showErrorModal: boolean = false; // Error modal flag
  errorMessage: string = ''; 


  @ViewChild('abilityDescription', { static: false }) abilityDescription!: ElementRef;
  @ViewChild('abilityName', { static: false }) abilityName!: ElementRef;
  @ViewChild('videoSource', { static: false }) videoSource!: ElementRef;
  @ViewChild('source', { static: false }) source!: ElementRef;

  constructor(
    private championService: ChampionService,
    private route: ActivatedRoute
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
        this.selectedSkin = this.champion.skins[0].id; // Select the first skin by default
        this.modifiedStats = { ...this.champion.stats }; // Initialize stats

      } catch (error) {
        this.errorMessage = 'Champion does not exist, check for spelling?';
        this.showErrorModal = true; // Show modal on error
      }
    });
    this.levels = Array.from({ length: 18 }, (_, i) => i + 1);

  }

  ngAfterViewInit(): void {
    this.showAbility('passive');  // Autoplay passive video when view is initialized
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
    dupObj.hp += dupObj.hpperlevel * value;
    dupObj.mp += dupObj.mpperlevel * value;
    dupObj.armor += dupObj.armorperlevel * value;
    dupObj.spellblock += dupObj.spellblockperlevel * value;
    dupObj.mpregen += dupObj.mpregenperlevel * value;
    dupObj.hpregen += dupObj.hpregenperlevel * value;
    dupObj.attackdamage += dupObj.attackdamageperlevel * value;
    dupObj.attackspeed =
      dupObj.attackspeed * (1 + (dupObj.attackspeedperlevel * value) / 100);
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
        // Ensure the video is reloaded and plays automatically
        this.videoSource.nativeElement.load();
        this.videoSource.nativeElement.play();
      } else {
        // Retry after a short delay if the elements are not available
        setTimeout(checkViewChildElements, 50);
      }
    };

  // Start checking
  checkViewChildElements();
}

  

  // Generate Skin Buttons Using Angular's *ngFor
  getSkinImageUrl(skinId: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${skinId}_0.jpg`;
  }

  // Method for switching skins
  changeSkin(skinId: string): void {
    this.selectedSkin = skinId;
  }
}
