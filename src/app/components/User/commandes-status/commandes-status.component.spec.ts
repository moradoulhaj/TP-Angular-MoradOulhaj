
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesStatusComponent } from './commandes-status.component';

describe('CommandesStatusComponent', () => {
  let component: CommandesStatusComponent;
  let fixture: ComponentFixture<CommandesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
