import { Component, OnInit } from '@angular/core';
import { Admin, admin } from '../models/admin.model';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})
export class AdminEditorComponent implements OnInit {
  dataAdmin: Admin | undefined;
  ngOnInit(): void {
    this.dataAdmin = admin;
  }
}
