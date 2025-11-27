import { Component } from '@angular/core';
import { Btn } from '../../../shared/ui/btn/btn';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crud-admin',
  imports: [Btn, RouterLink, RouterOutlet],
  templateUrl: './crud-admin.page.html',
  styleUrl: './crud-admin.page.css',
})
export class CrudAdminPage {}
