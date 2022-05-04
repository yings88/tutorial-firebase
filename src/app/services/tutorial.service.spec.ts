import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Tutorial } from '../models/tutorial.model';

import { TutorialService } from './tutorial.service';

describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
    });
    service = TestBed.inject(TutorialService);
  });

  const mockTutorial: Tutorial = {
    key: '1',
    title: 'title',
    description: 'description',
    published: false,
  };



  const data = {
    title: 'title 2',
    description: 'descriptiokn 2',
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tutorials', () => {
    var allTutos = service.getAll();
  })

  it('should create a tutorial', () => {
    service.create(mockTutorial);
  })

  //how to expect this
  it('should update a tutorial', fakeAsync(() => {
    service.update('1', data);
    tick();
   // expect(mockTutorial.title).toBe('title 2');
  }))

  it('should delete a tutorial', fakeAsync(() => {
    service.delete('1');
    tick();
    expect(mockTutorial).toBeUndefined();
  }))

  it('should delete all tutorials', () => {
    service.deleteAll();
  })

});
