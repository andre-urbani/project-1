/* eslint-disable no-inner-declarations */
function main() {

  const gameOver = document.querySelector('#game-over')
  const youWin = document.querySelector('#win')
  const body = document.querySelector('#body')
  const reset = document.querySelector('#reset')

  youWin.parentNode.removeChild(youWin)
  gameOver.parentNode.removeChild(gameOver)
  reset.parentNode.removeChild(reset)

  reset.addEventListener('click', () => {
    window.location.reload()
  })


  document.addEventListener('keyup', function (e) {
    if (13 === e.keyCode) {

      

      const elem = document.querySelector('.enter')
      elem.parentNode.removeChild(elem)

      const width = 20
      const gridSize = width ** 2
      const grid = document.querySelector('.grid')
      let playerCells = []
      let alienCells = []
      let bombCells = []
      let bulletCells = []
      const aliens = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177]
      let player = 390
      const displayScore = document.querySelector('#score')
      let score = 0
      const displayLives = document.querySelector('#lives')
      let lives = 3

      for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div') //the 'cell' variable is each of the new cell divs just created
        grid.appendChild(cell) //this is adding each of those divs to the main div(.grid) which creates the grid
        playerCells.push(cell) //this then pushes those divs into the empty 'playerCells' array, and each of those divs will have an index of 0-399, 0 being top left and 99 being bottom right. this is to store the player position 
        alienCells.push(cell) //same as above but stores the alien position
        bulletCells.push(cell)
        bombCells.push(cell)
      }

      playerCells[player].classList.add('player')

      for (let i = 0; i < aliens.length; i++) {
        alienCells[aliens[i]].classList.add('aliens')
      }

      document.addEventListener('keyup', (e) => {
        e.preventDefault()
        switch (e.keyCode) {
          case 37: {
            if (player === 0 || player < 381) {
              return
            }
            playerCells[player].classList.remove('player')
            player -= 1
            playerCells[player].classList.add('player')
            break
          }

          case 39: {
            if (player === ((gridSize) - 1)) {
              return
            }
            playerCells[player].classList.remove('player')
            player += 1
            playerCells[player].classList.add('player')
            break
          }

          case 32: {


            let bullet = player - 20
            bulletCells[bullet].classList.add('bullet')
            const bulletInterval = setInterval(() => {
              bulletCells[bullet].classList.remove('bullet')
              bullet = bullet - 20

              // debugger
              if (bullet <= 0) {
                clearInterval(bulletInterval)
              } else bulletCells[bullet].classList.add('bullet')

              for (let i = 0; i < aliens.length; i++)
                if (bullet === aliens[i]) {
                  displayScore.innerHTML = (score += 25)
                  clearInterval(bulletInterval)
                  bulletCells[bullet].classList.remove('bullet')
                  alienCells[aliens[i]].classList.remove('aliens')
                  aliens.splice(i, 1)
                }


              if (score === 3200) {
                body.appendChild(youWin)
                body.appendChild(reset)
                const audio = document.querySelector('#sounds')
                audio.src = 'sounds/270330__littlerobotsoundfactory__jingle-achievement-01.wav'
                audio.play()
                alienCells = []
                bombCells = []
                playerCells = []
                bulletCells = []
              }

            }, 100)

          }

        }

      })

      setInterval(() => {
        let bomb = aliens[Math.floor(Math.random() * aliens.length)] + 20
        bombCells[bomb].classList.add('bomb')
        const bombInterval = setInterval(() => {
          bombCells[bomb].classList.remove('bomb')
          bomb += 20

          if (bomb >= 400) {
            clearInterval(bombInterval)
          } else bombCells[bomb].classList.add('bomb')
          if (bomb === player) {
            displayLives.innerHTML = (lives -= 1)
            console.log('good')
          }

          if (lives === 0) {
            body.appendChild(gameOver)
            body.appendChild(reset)
            alienCells = []
            bombCells = []
            playerCells = []
            bulletCells = []
            const audio = document.querySelector('#sounds')
            audio.src = 'sounds/270329__littlerobotsoundfactory__jingle-lose-00.wav'
            audio.play()
          }

          for (let i = 0; i < aliens.length; i++)
            if (player === aliens[i]) {
              body.appendChild(gameOver)
              body.appendChild(reset)
              clearInterval(bombInterval)
              alienCells = []
              bombCells = []
              playerCells = []
              bulletCells = []
              const audio = document.querySelector('#sounds')
              audio.src = 'sounds/270329__littlerobotsoundfactory__jingle-lose-00.wav'
              audio.play()
            }

          for (let i = 0; i < aliens.length; i++)
            if (aliens[i] > 359) {
              // grid.parentNode.removeChild(grid)
              clearInterval(bombInterval)
              // bombCells[bomb].classList.remove('bomb')
              body.appendChild(gameOver)
              body.appendChild(reset)
              alienCells = []
              bombCells = []
              playerCells = []
              bulletCells = []
            }


        }, Math.floor(Math.random() * 50 - (50 - 75)))
      }, Math.floor(Math.random() * 1000 - (1000 - 1500)))

      // alien block movement

      // eslint-disable-next-line no-inner-declarations
      function moveRight() {

        // eslint-disable-next-line for-direction
        for (let i = aliens.length - 1; i < aliens.length; i--) {
          alienCells[aliens[i]].classList.remove('aliens')
          aliens[i] = aliens[i] + 1
          alienCells[aliens[i]].classList.add('aliens')
        }
      }

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
      timeout()

    }

  })

}

document.addEventListener('DOMContentLoaded', main)