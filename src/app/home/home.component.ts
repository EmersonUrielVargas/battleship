import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private localstorage: LocalStorageService,
    ) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.localstorage.clear();
    this.router.navigate(['start']);
  }

  joinGame(): void {
    console.log("presiono boton");
  }

}
