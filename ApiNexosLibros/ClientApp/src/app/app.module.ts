import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';

import { FetchLibroComponent } from './libro/fetchlibro/fetchlibro.component'
import { crearlibro } from './libro/addlibro/addlibro.component'
import { ServicioLibro } from './services/serviciolibro.service';
import { FetchRegistroComponent } from './registro/fetchregistro/fetchregistro.component';
import { crearregistro } from './registro/addregistro/addregistro.component';
import { ServicioRegistro } from './services/servicioregistro.service';
import { FetchAutorComponent } from './autor/fetchautor/fetchautor.component';
import { crearautor } from './autor/addautor/addautor.component';
import { ServicioAutor } from './services/servicioautor.service';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchLibroComponent,
    crearlibro,
    FetchRegistroComponent,
    crearregistro,
    FetchAutorComponent,
    crearautor
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'Libro', component: FetchLibroComponent },
      { path: 'register-libro', component: crearlibro },
      { path: 'libro/edit/:id', component: crearlibro },
      { path: 'fetch-registro', component: FetchRegistroComponent },
      { path: 'register-registro', component: crearregistro },
      { path: 'registro/edit/:id', component: crearregistro },
      { path: 'Autor', component: FetchAutorComponent },
      { path: 'register-autor', component: crearautor },
      { path: 'autor/edit/:id', component: crearautor }
    ])
  ],
  providers: [ServicioLibro, ServicioRegistro, ServicioAutor, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
