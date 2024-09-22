import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms'; 
import { ChampionService } from '../../services/champion.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockChampionService: any;
  let mockRouter: any;

  beforeEach(async () => {
    // Mock ChampionService
    mockChampionService = jasmine.createSpyObj(['getChampions']);
    mockChampionService.getChampions.and.returnValue(
      of({
        data: {
          Aatrox: { id: 'Aatrox', name: 'Aatrox' },
          Wukong: { id: 'MonkeyKing', name: 'Wukong' },
        },
      })
    );

    // Mock Router
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule], // Add FormsModule here
      providers: [
        { provide: ChampionService, useValue: mockChampionService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load champions on init', () => {
    expect(component.champions.length).toBe(2);
    expect(component.champions[0].name).toBe('Aatrox');
  });

  it('should search for a champion and navigate to the champion detail page if found', () => {
    component.searchValue = 'Aatrox';
    component.searchChampion();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/champion', 'Aatrox']);
  });


  it('should show error modal when champion is not found', () => {
    component.searchValue = 'UnknownChampion';
    component.searchChampion();
    expect(component.errorMessage).toBe('Champion not found. Please try again.');
    expect(component.showErrorModal).toBeTrue();
  });

  it('should close the error modal', () => {
    component.showErrorModal = true;
    component.closeErrorModal();
    expect(component.showErrorModal).toBeFalse();
  });

  it('should pick a random champion and navigate to its detail page', () => {
    spyOn(Math, 'random').and.returnValue(0); // Always pick the first champion
    component.getRandomChampion();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/champion', 'Aatrox']);
  });

  it('should show help paragraph when mouse enters help button', () => {
    component.showHelp();
    expect(component.showHelpParagraph).toBeTrue();
  });

  it('should hide help paragraph when mouse leaves help button', () => {
    component.hideHelp();
    expect(component.showHelpParagraph).toBeFalse();
  });
});
