import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'carusel [userPhotos]',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss']
})
export class CaruselComponent implements OnInit {

  @Input() userPhotos!: {fileName: string; filePath: string}[]
  photoPos: number = 1

  constructor() { }

  ngOnInit(): void {
  }

  getPos() {
    return this.userPhotos.length - this.photoPos
  }

  nextPhoto() {
    if(this.userPhotos.length > this.photoPos) {
      this.photoPos += 1
    } else {
      this.photoPos = 1
    }
  }

  prevPhoto() {
    if(this.photoPos === 1) {
      this.photoPos = this.userPhotos.length
    } else {
      this.photoPos -= 1
    }
  }
}
