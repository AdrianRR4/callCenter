import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit, AfterViewInit  {

  @ViewChild('barChart') barChart;
  @ViewChild('complaint') complaint;
  @ViewChild('doughnut') doughnut;
  bars: any;
  colorArray: any;
  line: any;
  dougth: any;

  constructor() {
  }
  ngAfterViewInit(): void {
    this.createCharts();
  }

  ngOnInit() {}

  createCharts() {
    if (
      (this.barChart.nativeElement && this.complaint.nativeElement,
      this.doughnut.nativeElement)
    ) {
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
          datasets: [
            {
              label: 'Miles de pesos',
              data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
              backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
          /*  yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
            */
          },
        },
      });
      this.line = new Chart(this.complaint.nativeElement, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
          datasets: [
            {
              label: 'Número de quejas',
              data: [5, 9, 8, 8, 5, 4, 3],
              fill: false,
              borderColor: 'rgb(38, 194, 129)',
            },
          ],
        },
      });

      this.dougth = new Chart(this.doughnut.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['20 lts', '30 lts', '40 lts'],
          datasets: [
            {
              label: 'Cilindros vendidos',
              data: [40, 50, 30],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
              ],
            },
          ],
        },
      });
    }
  }
}



