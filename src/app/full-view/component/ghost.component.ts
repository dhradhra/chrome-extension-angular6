import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-view-ghost',
  template: `
      <div class="ghost">
          <div class="ghost-content">
          </div>
      </div>
  `,
  styles: [
      `.ghost {
          padding: 10px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
      }`,
      `.ghost-content {
          background-color: rgba(255, 255, 255, .35);
          width: 100%;
          height: 100%;
          border-radius: 15px;
      }`
  ]
})
export class GhostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
