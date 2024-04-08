import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  userId: number | any;
  userDetail!: User | any;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any)=>{
      this.userId = res['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  fetchUserDetails(userId: any){
    this.api.getRegistrationUserId(userId).subscribe((data: any)=>{
      this.userDetail = data;
    })
  }

}
