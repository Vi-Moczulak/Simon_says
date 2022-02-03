var canvas = document.getElementById("canvas");
var list = new Array(10);
var moment = 0;
var user = 0;
var score = 0;
var play = 0;
var lasts = 0;
var input;
var w_time = 800;


function start_f() {
  for (var i = 1; i < 17; i++) {
    light_off(i);
  }
  start.style = "cursor: normal; color:rgb(0,0,0)";
  reset.style = "cursor: hand; color:rgb(212, 0, 255)";
  score = 0;
  setTimeout("start_game()", 1000);
}
function reset_f() {
  for (var i = 1; i < 17; i++) {
    light_up(i);
  }
  koniecx.textContent="";
  startx.textContent = "Start";
  //start.onclick="start_f()";
  start.style = "cursor: hand; color:rgb(212, 0, 255)";
  reset.style = "cursor: normal; color=rgb(0,0,0)";
}

function light_off(x) {
  if (x == 1) {
    x1.style = "background-color:rgb(100, 0, 0)";
  } else if (x == 2) {
    x2.style = "background-color:rgb(0, 100, 0)";
  } else if (x == 3) {
    x3.style = "background-color:rgb(0, 0, 100)";
  } else if (x == 4) {
    x4.style = "background-color:rgb(100, 100, 0)";
  } else if (x == 5) {
    x5.style = "background-color:rgb(100, 0, 100)";
  } else if (x == 6) {
    x6.style = "background-color:rgb(0, 100, 100)";
  } else if (x == 7) {
    x7.style = "background-color:rgb(83, 42, 76)";
  } else if (x == 8) {
    x8.style = "background-color:rgb(70, 70, 70)";
  } else if (x == 9) {
    x9.style = "background-color:rgb(70, 92, 100)"; 
  } else if (x == 10) {
    x10.style = "background-color:rgb(34, 51, 42)"; 
  } else if (x == 11) {
    x11.style = "background-color:rgb(99, 71, 40)"; 
  } else if (x == 12) {
    x12.style = "background-color:rgb(117, 11, 54)";
  } else if (x == 13) {
    x13.style = "background-color:rgb(78, 140, 88)";
  } else if (x == 14) {
    x14.style = "background-color:rgb(150, 150, 0)";
  } else if (x == 15) {
    x15.style = "background-color: rgb(47, 1, 95)";
  } else if (x == 16) {
    x16.style = "background-color:rgb(50, 0, 0)";
  }
}

function light_up(x) {
  if (x == 1) {
    x1.style = "background-color:rgb(200, 0, 0)";
  } else if (x == 2) {
    x2.style = "background-color:rgb(0, 200, 0)";
  } else if (x == 3) {
    x3.style = "background-color:rgb(0, 0, 200)";
  } else if (x == 4) {
    x4.style = "background-color:rgb(200, 200, 0)";
  } else if (x == 5) {
    x5.style = "background-color:rgb(200, 0, 200)";
  } else if (x == 6) {
    x6.style = "background-color:rgb(0, 200, 200)";
  } else if (x == 7) {
    x7.style = "background-color:rgb(183, 142, 176)";
  } else if (x == 8) {
    x8.style = "background-color:rgb(170, 170, 170)";
  } else if (x == 9) {
    x9.style = "background-color:rgb(170, 192, 200)"; //v
  } else if (x == 10) {
    x10.style = "background-color:rgb(134, 151, 142)"; //
  } else if (x == 11) {
    x11.style = "background-color:rgb(199, 171, 140)"; //v
  } else if (x == 12) {
    x12.style = "background-color:rgb(244, 67, 20)"; //
  } else if (x == 13) {
    x13.style = "background-color:rgb(178, 240, 158)";
  } else if (x == 14) {
    x14.style = "background-color:rgb(250, 250, 100)";
  } else if (x == 15) {
    x15.style = "background-color:rgb(147, 101, 195)";
  } else if (x == 16) {
    x16.style = "background-color:rgb(150, 100, 100)";
  }
}

function start_game() {
  moment = 0;
  list[score] = Math.floor(Math.random() * 16) + 1;
  console.log("List: " + score + " " + list);
  light_up(list[moment])
  setTimeout("auto_light_up()", w_time);
}

function auto_light_up(X) {
  light_off(list[moment]);
  if(moment<score){
    moment++;
    light_up(list[moment])
    setTimeout("auto_light_up()",w_time);
  }
  else{
    user = 1;
    moment = 0;
  }
}
function user_turn(x) {
  console.log("User - " + x);
  if (user == 1) {
    if(moment > 0){
      light_off(list[moment-1]);
    }

    if (list[moment] == x) {
      light_up(x);
      moment++;
      if (moment > score) {
		if (score > 5){
				w_time=500;
		}
        score++;
        user=0;
        wynikx.textContent = "Aktualny wynik: " + score;
        setTimeout("light_off("+x+")", w_time);
        setTimeout("start_game()", w_time);
      }
    } else {
      koniecx.textContent="Niewłaściwy kolor\nTwój wynik: " + score;
      wynikx.textContent = "Aktualny wynik: 0" ;
      score=0;
      user=0;
      setTimeout("reset_f()", 1000);
    }
  }else if(user==0 && x==1){
	  start_f()
	  }
}

function myclick(x) {
  user_turn(x);
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 49) {
    user_turn(1);
  } else if (event.keyCode == 50) {
    user_turn(2);
  } else if (event.keyCode == 51) {
    user_turn(3);
  } else if (event.keyCode == 52) {
    user_turn(4);
  } else if (event.keyCode == 81) {
    user_turn(5);
  } else if (event.keyCode == 87) {
    user_turn(6);
  } else if (event.keyCode == 69) {
    user_turn(7);
  } else if (event.keyCode == 82) {
    user_turn(8);
  } else if (event.keyCode == 65) {
    user_turn(9);
  } else if (event.keyCode == 83) {
    user_turn(10);
  } else if (event.keyCode == 68) {
    user_turn(11);
  } else if (event.keyCode == 70) {
    user_turn(12);
  } else if (event.keyCode == 90) {
    user_turn(13);
  } else if (event.keyCode == 88) {
    user_turn(14);
  } else if (event.keyCode == 67) {
    user_turn(15);
  } else if (event.keyCode == 86) {
    user_turn(16);
  }
});
