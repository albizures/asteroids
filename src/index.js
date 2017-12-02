import './index.css';

import * as PIXI from 'pixi.js';
import MainLoop from 'mainloop.js';
import m5 from 'mousetrap';

import { SHIP } from './constants/images';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var renderer = PIXI.autoDetectRenderer({ antialias: true });

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

renderer.render(stage);

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);


PIXI.loader
  .add(SHIP.name, SHIP.asset)
  .load(setup);

let ship;

function setup() {
  let interval
  ship = new PIXI.Sprite(
    PIXI.loader.resources[SHIP.name].texture
  );

  ship.scale.set(2, 2);
  ship.position.set(900, 500)
  ship.vx = 0;
  ship.vy = 0;

  ship.anchor.x = 0.5
  ship.anchor.y = 0.5

  stage.addChild(ship);

  m5.bind('down', () => {
    ship.vy = 0.3;
  });

  m5.bind('down', () => {
    clearInterval(interval);
    interval = setInterval(function () {
      if (ship.vy > 0.2) {
        ship.vy = 0.1;
        clearInterval(interval);
      } else {
        ship.vy -= 0.05;
      }
    }, 200);
  }, 'keyup');

  m5.bind('up', () => {
    ship.vy = -0.3;
  });

  m5.bind('up', () => {
    clearInterval(interval);
    interval = setInterval(function () {
      if (ship.vy > -0.2) {
        ship.vy = -0.1;
        clearInterval(interval);
      } else {
        ship.vy += 0.05;
      }
    }, 200);
  }, 'keyup');


  m5.bind('left', () => {
    ship.rotation -= 0.610865;
  });

  m5.bind('right', () => {
    ship.rotation += 0.610865;
  });

  renderer.render(stage);
  MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();
}


function update(delta) {

  const ca = Math.cos(ship.rotation);
  const sa = Math.sin(ship.rotation);


  ship.x = ship.x - ((ship.vy * sa) * delta);
  ship.y = ship.y + ((ship.vy * ca) * delta);

}


function draw() {
  renderer.render(stage);
}

function end() {
  // console.log('end')
}
