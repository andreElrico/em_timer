import { Injectable } from '@angular/core';

const NAME_PATH_MAP = {
  gong: './audio/singing-bowl-gong-69238.mp3',
  pause: './audio/pause_sound.mp3',
};
export type AudioName = keyof typeof NAME_PATH_MAP;

let currentAudio: HTMLAudioElement | null = null;

@Injectable({
  providedIn: 'root',
})
export class AudioServiceService {
  playSound(name: AudioName): void {
    // only one audio at a time
    currentAudio?.pause();
    currentAudio = null;

    const audio = new Audio(NAME_PATH_MAP[name]);
    audio.load();
    audio.play();

    currentAudio = audio;
  }
}
