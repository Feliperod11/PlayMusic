// MÚSICAS

let index = 0;

let tracks = [
  {
    Band: "Arctic Monkeys",
    Music: "Do I Wanna Know?",
    src: "./Assets/audio/1 - Arctic Monkeys - Do I Wanna Know.mp3",
    Cd: "./Assets/images/band_cd/1 - arcticmonkeys.jpg",
  },
  {
    Band: "The Neighbourhood",
    Music: "Sweater Weather",
    src: "./Assets/audio/2 - Sweater Weather.mp3",
    Cd: "./Assets/images/band_cd/2 - sweater weather.jpg",
  },
  {
    Band: "Ed Sheeran",
    Music: "Shape of You",
    src: "./Assets/audio/3 - Ed Sheeran - Shape of You.mp3",
    Cd: "./Assets/images/band_cd/3 - shape of you.jpeg",
  },
  {
    Band: "Bruno Mars",
    Music: "Leave the Door Open",
    src: "./Assets/audio/4 - Bruno Mars - Leave the Door Open.mp3",
    Cd: "./Assets/images/band_cd/4 - bruno mars.jpg",
  },
  {
    Band: "Arctic Monkeys",
    Music: "505",
    src: "./Assets/audio/7 - 505.mp3",
    Cd: "./Assets/images/band_cd/7 - 505.jpg",
  },
  {
    Band: "Drake",
    Music: "Gods Plan",
    src: "./Assets/audio/5 - Drake - Gods Plan.mp3",
    Cd: "./Assets/images/band_cd/5 - drake.jpg",
  },
  {
    Band: "Cigarettes After Sex",
    Music: "Affection",
    src: "./Assets/audio/6 - Affection - Cigarettes After Sex.mp3",
    Cd: "./Assets/images/band_cd/6 - Affection.jpg",
  },
];

// FAZENDO O BOTÃO DO PLAY

let audio = document.querySelector("#audio");
let sound = false;

function play() {
  let play = document.querySelector("#play");

  if (sound == false) {
    play.setAttribute("src", "./Assets/images/pause.png");
    audio.play();
    sound = true;

    animationRotation();
  } else {
    play.setAttribute("src", "./Assets/images/play.png");
    audio.pause();
    sound = false;

    animationRotation();
  }
}

// ROTAÇÃO ANIMAÇÃO

let cd = document.querySelector("#cd");
let animation = false;

function animationRotation() {
  if (animation == false) {
    cd.setAttribute("class", "animation");
    return (animation = true);
  } else {
    cd.removeAttribute("class");
    return (animation = false);
  }
}

// FAZENDO O BOTÃO DO SOM

let soundInput = document.querySelector("#sound");
let img_sound = document.querySelector("#img_sound");

function Volume() {
  audio.volume = soundInput.value / 100;

  if (soundInput.value == 0) {
    img_sound.setAttribute("src", "./Assets/images/volumemute.png");
    audio.muted = true;
  } else if (soundInput.value <= 40) {
    img_sound.setAttribute("src", "./Assets/images/volumedown.png");
    audio.muted = false;
  } else {
    img_sound.setAttribute("src", "./Assets/images/volumemax.png");
    audio.muted = false;
  }
}

// AVANÇAR OU RETROCEDER MUSICA

function back15() {
  audio.currentTime += -15;
}

function advanced15() {
  audio.currentTime += +15;
}

// BARRA DE PROGRESSO

function progressBar() {
  let progress = document.querySelector("#progress");
  progress.value = (audio.currentTime / audio.duration) * 100;
}
setInterval(progressBar, 10);

// VOLTAR/PULAR MÚSICA

let band = document.querySelector("#band_name");
let music = document.querySelector("#music_name");
let cdImage = document.querySelector("#cd");

function back() {
  index--;

  if (index < 0) {
    index = 0;
  }

  setTimeout(indexTracks, 300);
}

function jump() {
  index++;

  if (index >= tracks.length) {
    index = 0;
  }

  setTimeout(indexTracks, 380);
}

// index das músicas

function indexTracks() {
  band.innerHTML = tracks[index].Band;
  music.innerHTML = tracks[index].Music;
  cd.setAttribute("src", tracks[index].Cd);
  audio.src = tracks[index].src;

  audio.load();

  sound = false;
  animation = true;

  animationRotation();
  play();

  typeWrite(music);
}

// MÁQUINA DE ESCREVER

function typeWrite(element) {
  const textArray = element.innerHTML.split("");
  element.innerHTML = "";
  textArray.forEach(function (letter, i) {
    setTimeout(function () {
      element.innerHTML += letter;
    }, 75 * i);
  });
}

// TEMPO DA MÚSICA

let song_live = document.querySelector("#song_live");
let song_duration = document.querySelector("#song_duration");

function time() {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = Math.round(audio.currentTime % 60);
  let minutesTime = Math.floor(audio.duration / 60);
  let secondsTime = Math.round(audio.duration % 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutesTime < 10) {
    minutesTime = "0" + minutesTime;
  }
  if (secondsTime < 10) {
    secondsTime = "0" + secondsTime;
  }

  song_live.innerText = minutes + ":" + seconds;
  song_duration.innerText = minutesTime + ":" + secondsTime;

  changeSong();
}

setInterval(time, 1000);

function changeSong() {
  let totalTime = audio.duration;
  let currentTime = audio.currentTime;

  if (currentTime == totalTime) {
    jump();
  }
}
