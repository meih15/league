import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChampionListComponent } from './champion-list.component';
import { ChampionService } from '../../services/champion.service';
import { of } from 'rxjs';
import { CardModule } from 'primeng/card'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

describe('ChampionListComponent', () => {
  let component: ChampionListComponent;
  let fixture: ComponentFixture<ChampionListComponent>;
  let mockChampionService: any;

  beforeEach(async () => {
    // Mock ChampionService
    mockChampionService = jasmine.createSpyObj(['getChampions']);
    mockChampionService.getChampions.and.returnValue(
      of({
        data: {
          Aatrox: { id: 'Aatrox', name: 'Aatrox' },
          Ahri: { id: 'Ahri', name: 'Ahri' },
          Akali: { id: 'Akali', name: 'Akali' },
          // Add more champions as needed for pagination
        }
      })
    );

    await TestBed.configureTestingModule({
      declarations: [ChampionListComponent],
      imports: [CardModule, RouterTestingModule], // Import PrimeNG CardModule and RouterTestingModule
      providers: [
        { provide: ChampionService, useValue: mockChampionService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this to suppress unknown element errors
    }).compileComponents();

    fixture = TestBed.createComponent(ChampionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display champions on init', () => {
    expect(component.champions.length).toBeGreaterThan(0);  // Champions should be loaded
    expect(component.paginatedChampions.length).toBeLessThanOrEqual(component.itemsPerPage);  // Paginated champions should be correct
  });

  it('should paginate champions correctly', () => {
    component.changePage(1);  // Go to page 1
    expect(component.currentPage).toBe(1);  // Ensure page 1 is set
    expect(component.paginatedChampions.length).toBeLessThanOrEqual(component.itemsPerPage);  // Ensure the number of items is correct for the first page

    component.changePage(2);  // Go to page 2
    expect(component.currentPage).toBe(2);  // Ensure page 2 is set
  });

  it('should calculate total pages correctly', () => {
    const totalPages = component.getTotalPages();
    expect(totalPages.length).toBe(Math.ceil(component.champions.length / component.itemsPerPage));  // Ensure total pages calculation is correct
  });
});
