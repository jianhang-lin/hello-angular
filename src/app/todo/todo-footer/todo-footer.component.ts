import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  @Input() itemCount: number;
  @Output() doClear = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  doClick() {
    this.doClear.emit(true);
  }
}
