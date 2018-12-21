import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MessageService } from './service/message.service';
import { TestingStageService } from './service/testing-stage.service';

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
    MessageService,
    TestingStageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
