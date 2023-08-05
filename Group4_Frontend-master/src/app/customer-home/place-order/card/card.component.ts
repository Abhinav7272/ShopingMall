
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AddCardService } from './card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  addCardForm!: FormGroup;
  successMessage:any;
  errorMessage:any;
  submitted:boolean=false;
  cardTypeList = ["CREDIT_CARD", "DEBIT_CARD"]
  viewbilling:boolean=false;
  constructor(private formBuilder:FormBuilder, private service:AddCardService) { }
  ngOnInit(): void {
    this.addCardForm = this.formBuilder.group({
      cardType:['',[Validators.required]],
      cardNumber:['',[Validators.required,Validators.min(1000000000000000),Validators.max(9999999999999999)]],
      cvv:['',[Validators.required,Validators.min(100),Validators.max(999)]],
      expiryDate:['',[Validators.required,this.validateDate]],
      nameOnCard:['',[Validators.required,Validators.pattern("^[A-Za-z]+(?: [A-Za-z]+)*$"),Validators.maxLength(50)]]
    })
  }
  validateDate(control: FormControl):ValidationErrors | null{
    let today : Date = new Date();
    if (new Date(control.value) < today)
           return { "validateDate": true };
    return null
  }
  addNewCard(){
    console.log(this.addCardForm.value);
    let loggedInCustomer: any = JSON.parse(sessionStorage.getItem("customer") || "{}");
    this.successMessage = null;
    this.errorMessage = null;
    this.service.addNewCard(this.addCardForm.value,loggedInCustomer.emailId).subscribe({
      next : (message) =>{
        this.successMessage = message;
      }, error:  (error) => {
        this.errorMessage = "Please connect to backend";
      }
  });
  }
 

}
