import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { TutorialService } from 'src/app/services/tutorial.service';

import { TutorialDetailsComponent } from './tutorial-details.component';

describe('TutorialDetailsComponent', () => {
  let component: TutorialDetailsComponent;
  let fixture: ComponentFixture<TutorialDetailsComponent>;

  const tutorialService = jasmine.createSpyObj('TutorialService', [
    'update',
    'delete',
  ]);

  tutorialService.update.and.returnValue(Promise.resolve(null));
  tutorialService.delete.and.returnValue(Promise.resolve(null));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialDetailsComponent],
      providers: [{ provide: TutorialService, useValue: tutorialService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update published status', fakeAsync(() => {
    component.updatePublished(false);
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(component.currentTutorial.key).toBe('');
      expect(component.currentTutorial.published).toBe(false);
      expect(component.message).toBe('The status was updated successfully!');
    });
  }));

  it('should delete tutorial', fakeAsync(() => {
    component.deleteTutorial();
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(component.message).toBe('The tutorial was updated successfully!');
    });
  }));

  it('should update tutorial', fakeAsync(() => {
    component.updateTutorial();
    fixture.detectChanges();
    expect(component.currentTutorial.key).toBe('1');
    tick();
    fixture.whenStable().then(() => {
      expect(component.currentTutorial.key).toBe('1');
    });
  }));

  it('should trigger ngOnChanges', fakeAsync(() => {
    fixture = TestBed.createComponent(TutorialDetailsComponent);

    spyOn(component, 'updatePublished');
    let p = fixture.debugElement.nativeElement.querySelector('p');

    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(p.textContent).toBe('');
    });
  }));
});
