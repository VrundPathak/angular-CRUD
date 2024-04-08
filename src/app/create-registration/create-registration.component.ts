import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrl: './create-registration.component.scss'
})
export class CreateRegistrationComponent implements OnInit {
  packages: string[] = ["Monthly","Quarterly","Yearly"];
  genders: string[] = ["Male","Female"];
  importantList: string[] = [
  "Toxic Fat reduction",
  "Energy and Endurance",
  "Building Lean Muscle", 
  "Healthier Digestive System", 
  "Sugar Craving Body",
  "Fitness"
];

registerForm!: FormGroup;
userIdToUpdate!: number | any;
isUpdateActive: boolean = false;

constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute, private api: ApiService, private toastService: NgToastService, private router: Router) {

}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveClubBefore: [''],
      enquiryDate: ['']
    })

    this.registerForm.controls['height'].valueChanges.subscribe((data) => {
      this.calculateBmi(data);
    });

    this.activatedRoute.params.subscribe(val =>{
      this.userIdToUpdate = val['id'];
      this.api.getRegistrationUserId(this.userIdToUpdate).subscribe((res: any) =>{
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      })
    })
  }

  submitForm(){
    this.api.postRegistration(this.registerForm.value).subscribe(res=>{
      this.toastService.success({detail: "Success", summary: "Registration Successful", duration: 3000});
      this.registerForm.reset();
    })
  }
  update(){
    this.api.updateRegistration(this.userIdToUpdate,this.registerForm.value).subscribe(res=>{
      this.toastService.success({detail: "Success", summary: "Updated Successful", duration: 3000});
      this.registerForm.reset();
      this.router.navigate(['list'])
    })
  }

  calculateBmi(heightValue: number){
    const weight  = this.registerForm.value.height;
    const height = heightValue;
    const bmi = weight/(height * height);
    this.registerForm.patchValue({
      bmi: bmi
    })
    switch (true) {
      case (bmi < 18.5):
        this.registerForm.patchValue({
          bmiResult: 'Underweight'
        })
        break;
      case (bmi >= 18.5 && bmi <= 24.9):
        this.registerForm.patchValue({
          bmiResult: 'Normal'
        })
        break;
      case (bmi >= 25 && bmi <= 29.9):
        this.registerForm.patchValue({
          bmiResult: 'Overweight'
        })
        break;
      case (bmi >= 30):
        this.registerForm.patchValue({
          bmiResult: 'Obese'
        })
        break;
    }
  }
  fillFormToUpdate(user: User){
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveClubBefore: user.haveClubBefore,
      enquiryDate: user.enquiryDate
    })
  }
}

