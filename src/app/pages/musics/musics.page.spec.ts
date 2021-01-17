import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MusicsPage } from './musics.page';

describe('MusicsPage', () => {
  let component: MusicsPage;
  let fixture: ComponentFixture<MusicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MusicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
