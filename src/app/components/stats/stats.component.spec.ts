import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartModule } from 'primeng/chart';


describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsComponent],
      imports: [ChartModule], // Import PrimeNG ChartModule
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this to allow PrimeNG components
    }).compileComponents();


    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize radar chart data and options when a champion is provided', () => {
    const mockChampion = {
      name: 'Aatrox',
      stats: {
        attackdamage: 5,
        armor: 7,
        spellblock: 6,
      },
    };


    component.champion = mockChampion;
    component.ngOnInit();


    expect(component.data).toEqual({
      labels: ['Attack', 'Defense', 'Magic'],
      datasets: [
        {
          label: `Aatrox's Stats`,
          data: [5, 7, 6], // attackdamage, armor, spellblock
          backgroundColor: 'rgba(255, 140, 0, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    });


    expect(component.options).toEqual({
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          min: 1,
          max: 10,
          beginAtZero: true,
          display: true,
          color: '#ffffff',
        },
        angleLines: {
          color: '#ffffff',
          lineWidth: 2,
        },
        gridLines: {
          color: '#ffffff',
          lineWidth: 2,
        },
        pointLabels: {
          fontSize: 14,
          fontColor: '#ffffff',
        },
      },
    });
  });


  it('should not initialize radar chart data if no champion is provided', () => {
    component.ngOnInit();
    expect(component.data).toBeUndefined();
    expect(component.options).toBeUndefined();
  });
});
