// collision.js - Handles collision detection and response
// This file manages all collision-related logic in the game

import { DEFAULTS } from './constants.js';

export class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  // Check for all collisions in the game
  checkCollisions() {
    this.game = game;
  }


  checkCollisions() {
    if (!this.game.ball || !this.game.paddle) {
      return;
    }

    this.checkPaddleCollision();

    this.checkBrickCollisions();
  }

  checkPaddleCollision() {
    const ball = this.game.ball;
    const paddle = this.game.paddle;

    if (
      ball.y + ball.size > paddle.y &&
      ball.y + ball.size < paddle.y + paddle.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {

      ball.dy = -ball.speed;

      const hitPosition = (ball.x - paddle.x) / paddle.width;
      ball.dx = ball.speed * (hitPosition * 2 - 1) * 1.5;
    }
  }

  checkBrickCollisions() {

    const ball = this.game.ball;
    const bricks = this.game.bricks;

    for (const brick of bricks) {

      if (!brick.broken && ball.collidesWith(brick)) {

        brick.break();

        this.game.addScore(DEFAULTS.POINTS_PER_BRICK);

        this.calculateBounceDirection(ball, brick);
        break;
      }
    }
  }


  calculateBounceDirection(ball, brick) {
    const ballCenterX = ball.x + ball.size / 2;
    const ballCenterY = ball.y + ball.size / 2;
    const brickCenterX = brick.x + brick.width / 2;
    const brickCenterY = brick.y + brick.height / 2;


    const dx = ballCenterX - brickCenterX;
    const dy = ballCenterY - brickCenterY;

    const absDX = Math.abs(dx);
    const absDY = Math.abs(dy);

    if (absDX > absDY) {
      ball.dx = -ball.dx;
    } else {
      ball.dy = -ball.dy;
    }
  }
}