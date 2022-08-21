// import functions using "./bird.js" file
import { updateBird, setupBird, getBirdRect } from "./bird.js"
// import functions from "./pipe.js" file
import { updatePipes } from "./pipe.js"

// adding eventListener to start up game
document.addEventListener("keypress", handleStart, { once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

// creating a variable to produce and log frame rate/time
let lastTime

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
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld
}

// game start function
function handleStart() {
    title.classList.add("hide")
    setupBird()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

// game lose function
function handleLose() {
    setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = "0 Pipes"
    document.addEventListener("keypress", handleStart, { once: true})
    }, 1000)
    
}