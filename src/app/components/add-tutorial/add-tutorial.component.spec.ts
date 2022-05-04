import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TutorialService } from 'src/app/services/tutorial.service';

import { AddTutorialComponent } from './add-tutorial.component';

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  const tutorialService = jasmine.createSpyObj('TutorialService', ['create']);
  tutorialService.create.and.returnValue(Promise.resolve(null));


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTutorialComponent],
      providers: [{ provide: TutorialService, useValue: tutorialService }],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a tutorial', fakeAsync(() => {
    component.saveTutorial();
    expect(component.submitted).toBe(false);
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(component.submitted).toBe(true);
    });
  }));


  it('should create a tutorial', fakeAsync(() => {
    component.newTutorial();
    expect(component.submitted).toBe(false);
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(component.submitted).toBe(false);
    });
  }))
});
