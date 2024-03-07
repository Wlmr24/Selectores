import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPageComponent } from './selectorpages.component';

describe('SelectorpagesComponent', () => {
  let component: SelectorPageComponent;
  let fixture: ComponentFixture<SelectorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
