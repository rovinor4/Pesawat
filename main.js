var main, content;
var CanvasWitdh;
var laserAudio;
var gambar, pesawat, laser, batu;
var PesawatX, PesawatY;
var laserX, laserY;
var batuX, batuY;
var LaserArray = [];
var BatuArray = [];
var TimeGame, TimeBatu;


window.onload = function () {
  main = document.getElementById("myCanvas");
  content = main.getContext("2d");

  //Tampilan Pesawat 

  //Tampilan Background
  gambar = new Image();
  gambar.src = "./img/bg.png";
  gambar.onload = () => {
    content.drawImage(gambar, 0, 0, main.width, main.height);
  }

  pesawat = new Image();
  pesawat.src = "./img/pesawat.png";
  pesawat.onload = () => {
    PesawatX = 0;
    PesawatY = main.height - 100;
    content.drawImage(pesawat, PesawatX, PesawatY, 100, 100);
  }


  laser = new Image();
  laser.src = "./img/laser.png";
  laser.onload = () => {
    laserX = 20;
    laserY = main.height - 100;
    content.drawImage(laser, laserX, laserY, 100, 100);
  }

  batu = new Image();
  batu.src = "./img/Batu.png";
  batu.onload = () => {
    batuX = 20;
    batuY = main.height - 100;
    content.drawImage(batu, batuX, batuY, 100, 100);
  }

  setTimeout(() => {
    laserAudio = new Audio;
    laserAudio.src = "./audio/atmosphere.wav";
    laserAudio.volume = 0.1;
    laserAudio.loop = true;
    laserAudio.play();
  }, 1000);

  Controller();
  TimeGame = setInterval(() => {
    perpindahan();
  }, 100);

  TimeBatu = setInterval(() => {
    inserBatu();
  }, 2000);


};



function perpindahan() {
  content.drawImage(gambar, 0, 0, main.width, main.height);
  content.drawImage(pesawat, PesawatX, PesawatY, 100, 100);
  LaserGerak();
  gerakBatu();
}

function pesawtController(status) {
  if (status == "kanan") {
    PesawatX += 100;
    if (PesawatX > main.width - 100) {
      PesawatX = main.width - 100;
    }
  } else if (status == "kiri") {
    PesawatX -= 100;
    if (PesawatX < 0) {
      PesawatX = 0;
    }
  }

}


function playLaser() {

  var laserAudio = new Audio;
  laserAudio.src = "./audio/laser.wav";
  laserAudio.play();
  LaserArray.push({
    y: laserY,
    x: PesawatX,
    s: false
  });
  // console.log(LaserArray[0].x);

  // content.drawImage(laser, PesawatX, laserY, 100, 100);

}


function LaserGerak() {
  jumlahPeluru = LaserArray.filter((val) => val.y > 0 && val.s == false);
  jumlahPeluru.forEach(val => {
    val.y -= 10;
    // BatuArray.filter((data) => data.y == val.y && data.x == val.x );
    // BatuArray.forEach(element => {
    //   element = true;
    //   val.s = true;
    // });

    // if (BatuArray[0].y){
    //   if (val.y == BatuArray[0].y ){
    //     console.log("laser " + val.y);
    //     console.log("batu " + BatuArray[0].y);
    //   }
    // }

    BatuArray.map(elem => {
      if (elem.y >= val.y-90 && elem.x == val.x && elem.s == false) {
        elem.s = true;
        val.s = true;
      }
      return elem;
    });

    content.drawImage(laser, val.x, val.y, 100, 100);
  });
  // console.log(LaserArray[0].y);
}

function Controller() {
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key == "ArrowLeft") {
      pesawtController("kiri");
    } else if (e.key == "ArrowRight") {
      pesawtController("kanan");
    } else if (e.code == "Space") {
      playLaser();
    }
  })
}

function inserBatu() {
  BatuArray.push({
    y: 0,
    x: Math.floor(Math.random() * 6) * 100,
    // x: 0,
    s: false
  });
}


function gerakBatu() {
  jumlahBatu = BatuArray.filter((val) => val.s == false);

  jumlahBatu.forEach(val => {
    val.y += 10;
    if (val.y > 500) {
      val.y = 500;
      clearInterval(TimeBatu);
      clearInterval(TimeGame);
      if (confirm("Lanjutkan")) {
        window.location.reload();
      } else {
        txt = "You pressed Cancel!";
      }
    }
    content.drawImage(batu, val.x, val.y, 100, 100);
  })

}