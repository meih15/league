import { TestBed } from '@angular/core/testing';
import { ChampionService } from './champion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChampionService', () => {
  let service: ChampionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ChampionService],
    });

    service = TestBed.inject(ChampionService);
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getChampions and return champion data', () => {
    const mockChampionData = {
      data: {
        Aatrox: { id: 'Aatrox', name: 'Aatrox' },
        Ahri: { id: 'Ahri', name: 'Ahri' },
      },
    };

    service.getChampions().subscribe((champions) => {
      expect(champions.data).toEqual(mockChampionData.data);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockChampionData); 
  });
});
