import { Component, OnInit } from '@angular/core';
import AOS from "aos";

@Component({
  selector: 'mascota-feliz-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
})
export class TestimoniosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
