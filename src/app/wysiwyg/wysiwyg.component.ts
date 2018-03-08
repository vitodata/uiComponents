import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'wysiwyg.component.html'
})
export class WysiwygComponent implements OnInit {
  quillModules = {};

  constructor() {
    this.quillModules = {
      toolbar: [['bold', 'italic', 'underline', 'strike'], [{ color: [] }]]
    };
  }

  ngOnInit() {}
}
