import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TracknewComponent } from './tracknew.component';

describe('TracknewComponent', () => {
  let component: TracknewComponent;
  let fixture: ComponentFixture<TracknewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracknewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TracknewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
