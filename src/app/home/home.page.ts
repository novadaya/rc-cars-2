import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
    private audioContext: AudioContext;
    private oscillator: OscillatorNode | undefined;
    public frequency: number = 0; // Kezdő frekvencia
    private maxFrequency: number = 20000; // Maximális frekvencia
    public frequencyIncrement: number = 100; // Növelés lépésköze
    private waiting = 500;
    private intervalId: any;
frekvencia: any;
    
    constructor() {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  
    // Funkció a ciklikus lejátszáshoz
    startToneCycle() {
      this.playTone(this.frequency); // Kezdés 0 Hz-en
      
      this.intervalId = setInterval(() => {
        this.stopTone(); // Megállítjuk az előző hangot
        this.frequency += this.frequencyIncrement; // Növeljük a frekvenciát
  
        if (this.frequency > this.maxFrequency) {
          this.frequency = this.maxFrequency; // Maximum 2000 Hz
          clearInterval(this.intervalId); // Ha elérjük a 2000 Hz-et, leállítjuk a ciklust
        } else {
          this.playTone(this.frequency); // Lejátszunk egy új frekvenciát
        }
      }, this.waiting); // Minden egyes ciklus 1 másodperc
      this.frequency = 0;
    }
  
    // Funkció egy adott frekvenciájú hang lejátszásához
    playTone(frequency: number) {
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      this.oscillator.connect(this.audioContext.destination);
      this.oscillator.start();
    }
  
    // Hang kikapcsolása
    stopTone() {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
      }
    }
  }
  

