#Space Invaders Project

![Space Invaders](https://user-images.githubusercontent.com/41396233/73085756-1d58e300-3ec7-11ea-9e99-5e6988de67a0.png)

##Introduction

Space Invadors is my reproduction of the classic arcade game, developed using vanilla JavaScript only. This was my first project on General Assembly's Software Engineering Immersive Course, and was an individual project after 3 weeks of learning HTML, CSS and JavaScript.

You can try it out yourself [here](https://andre-urbani.github.io/project-1/)

##Brief

- Render a grid-based game in the browser
- Allow player to move left or right & fire a laser.
- Automatically move enemies right, left & down, as well as periodically dropping bombs.
- The player should be able to clear at least one wave of enemies, upon which the game starts again.
- The player's score should be displayed at the end of the game.
- Include separate HTML / CSS / JavaScript files.
- Use Javascript for DOM manipulation.
- Deploy your game online, using Github Pages, where the rest of the world can access it.
- Use semantic markup for HTML and CSS.

##Technologies used

- JavaScript
- HTML5
- CSS
- GitHub

##Game overview

Space Invaders is a single-player game based on the same gameplay mechanics of the original Space Invaders arcade game from the 1980s. The aim is to shoot as many enemies as possible before they descend upon you, with each enemy destroyed earning the player 25 points. The player has 3 lives, and has to evade the alien lasers, otherwise one life is lost. If all aliens are destroyed, player wins, and if all 3 player lives are lost, Game Over!

The player controls the spaciship movement (left and right only) and firing of lasers.

### CONTROLS
Start game: 'Enter'

Player movements: ← → keys

Firing: 'Spacebar'

![Space Invaders](https://user-images.githubusercontent.com/41396233/73085739-116d2100-3ec7-11ea-8735-4961388c38a3.png)

##Process

### Grid & Starting Layout
The initial process of creating a grid was achieved by firstly creating a div element, giving each of these the class of 'grid' and appending them to a grid, then pushing the grid into an empty array. This gave me an empty grid with the id of each div set as its index.

A similar process was then repeated for assigning the individual cells to represent each object I required for the gameplay: player, enemies, laser & bomb. The class would then be assigned to a position/positions on the grid based on an index.

###Controlling movement

The first movement aspect to be developed was for the player. I used an event listener, allowing only the use of the left and right arrow keys with a switch statement. I then added a further if statement to restrict player movement off screen or out of the bottom row of the grid.

An event listener was also used for the player bullets (spacebar) which triggers a set interval for the bullet to move up the grid by 20 spaces every 100ms, giving the illusion of a fluidly moving bullet.

Set intervals were also used for the alien movement and the bombs periodically dropped by the aliens. Alien movement proved to be especially tricky, and in hindsight I realised I could have gone with a more efficient method through the use of if statements to make the aliens move in formation in the opposite direction upon reaching the end of the grid on either side.

```
  function moveDown() {

    // eslint-disable-next-line for-direction
    for (let i = aliens.length - 1; i < aliens.length; i--) {
      alienCells[aliens[i]].classList.remove('aliens')
      aliens[i] = aliens[i] + 20
      alienCells[aliens[i]].classList.add('aliens')
    }
  }

  function moveLeft() {

    for (let i = 0; i < aliens.length; i++) {
      alienCells[aliens[i]].classList.remove('aliens')
      aliens[i] = aliens[i] - 1
      alienCells[aliens[i]].classList.add('aliens')
    }
  }

  setTimeout(() => {
    moveRight()
  }, 1000)
  setTimeout(() => {
    moveDown()
  }, 2000)
  setTimeout(() => {
    moveLeft()
  }, 3000)

  // eslint-disable-next-line no-inner-declarations
  function timeout() {
    setInterval(() => {
      setTimeout(() => {
        moveRight()
      }, 1000)
      setTimeout(() => {
        moveDown()
      }, 2000)
      setTimeout(() => {
        moveLeft()
      }, 3000)
    }, 3000)
  }
``` 

###Hit detection

For both the bullet hitting an alien, and a bomb landing on the player, I used an if statement within a for loop to detect if the bomb/player bullet/alien index on the grid matched, or contained the same index for the aliens array, then remove a life or add 25 points.

With the collision of the bullet and alien there was a further function required, that being the destruction/removal of the hit alien from the game-board. For this I used splice on the alien array to remove the specified alien.

Hit detection code for player bullet hitting alien is shown below.

```
for (let i = 0; i < aliens.length; i++)
 if (bullet === aliens[i]) {
  let explosion = aliens[i]
  explosionCells[explosion].classList.add('explosion')
  setTimeout(() => {
   explosionCells[explosion].classList.remove('explosion')
  }, 200)
  displayScore.innerHTML = (score += 25)
  clearInterval(bulletInterval)
  bulletCells[bullet].classList.remove('bullet')
  alienCells[aliens[i]].classList.remove('aliens')
  aliens.splice(i, 1)
}

```

##Result

As the project focused entirely on vanilla JavaScript, HTML and CSS, I feel that I became a lot more comfortable with the key JavaScript concepts such as functions, scope, timers and 'if else' statements.

I am very happy with the final result and what I managed to achieve during the project, especially considering this was my first attempt at creating a project from initial concept using JavaScript.

##Wins & Challenges

###Wins

- Creating a fully functioning game, with the result being exactly as I had wanted
- Solidifying my understanding of key JavaScript concepts, such as funcitons, arrays, for loops and if/else statements
- Developing an understanding of DOM manipulation through JavaScript

###Challenges

- Programming the aliens to move in formation, even when aliens are destroyed and removed from the grid, without affecting the overall structure
- Hit detection adnd successfully identifying when the laster hits the alien and therefore destroys the alien, removing it from the grid
