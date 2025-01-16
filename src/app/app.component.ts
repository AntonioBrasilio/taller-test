import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDataService } from '../services/apidata.service';
import { FormsModule } from '@angular/forms';
import { ItemComponentComponent } from '../item-component/item-component.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ItemComponentComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiDataService],
})
export class AppComponent {
  datas: any;
  search: any;

  dataFiltered: any;

  constructor(private apiDataService: ApiDataService) {}

  ngOnInit() {
    this.apiDataService.getData().subscribe((res) => {
      this.datas = res;
      this.dataFiltered = res;
    });
  }

  handleSearch() {
    this.dataFiltered = this.datas
      .map((el: any) => {
        if (!this.search || this.search === '') {
          return el;
        }
        if (el.name.includes(this.search)) {
          return el;
        }
      })
      .filter((el: any) => el && (el.name !== '' || el.email !== ''));
  }
}
