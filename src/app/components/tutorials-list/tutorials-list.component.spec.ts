import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

import { TutorialsListComponent } from './tutorials-list.component';

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;



  const tutorialService = jasmine.createSpyObj('TutorialService', [
    'getAll',
    'deleteAll',
  ]);
  tutorialService.getAll.and.returnValue(Promise.resolve(null));

  tutorialService.deleteAll.and.returnValue(Promise.resolve(null));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent],
      providers: [{ provide: TutorialService, useValue: tutorialService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use data from tutorial service', () => {
    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;

    expect(tutorialService.tutorialsRef).toEqual(component.tutorials);
  });

  it('should refresh the list', () => {
    component.refreshList();
    expect(component.currentTutorial).toBe(undefined);
  });

  it('should retrieve tutorials', fakeAsync(() => {
    component.retrieveTutorials();
    expect(component.tutorials);
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {});
  }));

  it('should set active tutorial', fakeAsync(() => {
    const mockTutorial: Tutorial = {
      key: '1',
      title: 'title',
      description: 'description',
      published: false,
    };
    component.setActiveTutorial(mockTutorial, 1);
  }));

  it('should delete all tutorials', () => {
    component.removeAllTutorials();
  });
});
