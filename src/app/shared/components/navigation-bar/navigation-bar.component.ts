import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidePanelState, SidePanelService } from 'src/app/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;

  constructor(private _sidePanelService: SidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
  }

  public handleSingleClick(): void {
    if (this.currentPanelState === SidePanelState.CLOSE || this.currentPanelState === SidePanelState.COLLAPSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
    }
    // else if (this.currentPanelState === SidePanelState.OPEN) {
    //   this._sidePanelService.changeState(SidePanelState.CLOSE)
    // }
    else {
      this._sidePanelService.changeState(SidePanelState.COLLAPSE);
    }
  }

  public handleDoubleClick(): void {
    if (this.currentPanelState === SidePanelState.CLOSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN)
    } else {
      this._sidePanelService.changeState(SidePanelState.CLOSE);
    }
  }

  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
}
