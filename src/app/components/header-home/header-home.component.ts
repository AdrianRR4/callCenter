import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.scss'],
})
export class HeaderHomeComponent implements OnInit {

  rols: string[]=['Agente call center', 'Monitor quejas y fugas', 'monitor cilindors'];
  date: Date = new Date;
  nowdate: string;
  user:any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() title?:string="Home";

  constructor(private oauthService: LoginService) { }

  ngOnInit() {


    this.nowdate = this.date.toLocaleDateString();
    console.log(this.nowdate);
    this.oauthService.getUser().subscribe(data=>{
      this.user=data;
      console.log(this.user);
    });

  }

}
