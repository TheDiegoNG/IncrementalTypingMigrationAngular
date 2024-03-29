import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuModuleModule } from './menu-module/menu-module.module';
import { HeaderModuleModule } from './header-module/header-module.module';
import { OverlayComponent } from './overlay/overlay.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TimerService } from './services/timer.service';

export function initializeApp(timerService: TimerService): () => Promise<any> {
  return () => timerService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModuleModule,
    HeaderModuleModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [MessageService, TimerService, {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [TimerService], multi:true,}],
  bootstrap: [AppComponent]
})
export class AppModule { }
