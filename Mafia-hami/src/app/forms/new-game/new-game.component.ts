import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  newGameForm:any

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newGameForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  }

  onSubmit(): void {
    // Process checkout data here
  console.log(JSON.stringify(this.newGameForm.value));
  }

}
