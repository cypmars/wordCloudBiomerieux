import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgWordCloudModule } from 'angular4-word-cloud-mouse-events';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgWordCloudModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
