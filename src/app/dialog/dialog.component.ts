import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../login/login.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  Dialog_Title = this.data.Title;
  Dialog_Content = this.data.Content;
  Dialog_Button = this.data.ButtonContent;
  showDialogButton = this.data.ShowButton;

  ngOnInit(): void {
  }

}
