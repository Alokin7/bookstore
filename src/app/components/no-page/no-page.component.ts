import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [
    CardModule,
    RouterLink
  ],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.css'
})
export class NoPageComponent {

}
