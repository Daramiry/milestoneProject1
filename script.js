// using import to call functions from other 'JS' files 

// import functions using "./bird.js" file
import { updateBird, setupBird, getBirdRect } from "./bird.js"
// import functions from "./pipe.js" file
import { updatePipes, setupPipes, getPipeScore, pipeRects } from "./pipe.js"
// end of import 

// adding eventListener to start up game
document.addEventListener("keypress", handleStart, { once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

// creating a variable to produce and log frame rate/time
let lastTime

// request framerate time, making it return time as low of a number as possible 
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

// function to check how the game makes users lose
function checkLose() {
    const birdRect = getBirdRect()
    const insidePipe = pipeRects().some(rect => pipeCollision(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

// code to make "bird" react to collision of pipe
function pipeCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

// game start function
function handleStart() {
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

// game lose function
function handleLose() {
    setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = `${getPipeScore()} Pipes`
    document.addEventListener("keypress", handleStart, { once: true})
    }, 1000)
    
}