import { Injectable } from '@angular/core';

const NAME_PATH_MAP = {
  gong: './audio/singing-bowl-gong-69238.mp3',
};
type AudioName = keyof typeof NAME_PATH_MAP;

@Injectable({
  providedIn: 'root',
})
export class AudioServiceService {
  playSound(name: AudioName): void {
    const audio = new Audio(NAME_PATH_MAP[name]);
    audio.load();
    audio.play();
  }

  constructor() {
    this.playSound('gong');
  }
}
