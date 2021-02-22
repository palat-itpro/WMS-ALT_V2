import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../auth/user-auth.service'
import { Menuitems } from '../../../models/menuitems'
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  showFiller = false;

  menuItems = [
    {link:'',icon:'dashboard',desc: 'Dashboard'},
    {link:'exwh',icon:'view_module',desc: 'Ex-Warehouse'},
    {link:'stkctrl',icon:'flip_to_back',desc: 'Stock-control'},
    {link:'soh',icon:'fact_check',desc: 'SOH'},
    {link:'partorders',icon:'dynamic_form',desc: 'Part orders'}

  ]

  constructor(private userAuth: UserAuthService) {

   }



  ngOnInit(): void {
  }

}
