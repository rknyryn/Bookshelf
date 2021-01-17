import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMusicPage } from './add-music.page';

describe('AddMusicPage', () => {
  let component: AddMusicPage;
  let fixture: ComponentFixture<AddMusicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMusicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
