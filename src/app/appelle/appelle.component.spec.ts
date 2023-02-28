import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelleComponent } from './appelle.component';

describe('AppelleComponent', () => {
  let component: AppelleComponent;
  let fixture: ComponentFixture<AppelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
