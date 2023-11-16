import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  success(text: string) {
    alertify.success(text);
  }
  warning(text: string) {
    alertify.warning(text);
  }
  error(text: string) {
    alertify.error(text);
  }
}
