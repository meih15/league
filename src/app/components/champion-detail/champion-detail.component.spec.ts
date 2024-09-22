import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChampionDetailComponent } from './champion-detail.component';
import { ChampionService } from '../../services/champion.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ChampionDetailComponent', () => {
  let component: ChampionDetailComponent;
  let fixture: ComponentFixture<ChampionDetailComponent>;
  let mockChampionService: any;

  beforeEach(async () => {
    // Mock the ChampionService
    mockChampionService = jasmine.createSpyObj(['getChampions']);
    // Mocked response for getChampions
    mockChampionService.getChampions.and.returnValue(of({
      data: {
        Aatrox: { id: 'Aatrox', name: 'Aatrox', key: '266', stats: { attackdamage: 60, armor: 30, spellblock: 32 } },
        Ahri: { id: 'Ahri', name: 'Ahri', key: '103', stats: { attackdamage: 53, armor: 20, spellblock: 30 } }
      }
    }));

    // Mock ActivatedRoute
    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => 'Aatrox' } }
    };

    await TestBed.configureTestingModule({
      declarations: [ChampionDetailComponent],
      providers: [
        { provide: ChampionService, useValue: mockChampionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChampionDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
