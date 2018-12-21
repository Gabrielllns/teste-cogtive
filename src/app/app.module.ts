import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { StageService } from './service/stage.service';
import { ActionService } from './service/action.service';
import { MessageService } from './service/message.service';

/**
 * Module responsável pelo compontente 'App'.
 *
 * @author Gabriel Neres
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    StageService,
    ActionService,
    MessageService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
