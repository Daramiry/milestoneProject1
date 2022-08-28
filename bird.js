// grabs bird using [data-bird] from "index.html"
const birdElem = document.querySelector('[data-bird]')

// bird fall speed
const BIRD_SPEED = .40

const JUMP_DURATION = 125

let timeSinceLastJump = Number.POSITIVE_INFINITY

// use export to be able to transfer files between javaScript files 
export function setupBird() {
    setTop(window.innerHeight / 2)
    document.removeEventListener('keydown', handleJump)
    document.addEventListener('keydown', handleJump)
}

// fall down speed 
export function updateBird(delta) {
    if(timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - BIRD_SPEED * delta)
    } else {
        setTop(getTop() + BIRD_SPEED * delta) 
    }
    timeSinceLastJump += delta
}

// gives collision going off screen
export function getBirdRect() {
    return birdElem.getBoundingClientRect()
}
// end of export 

function setTop(top){
    birdElem.style.setProperty("--bird-top", top)
}

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
} 

// spacebar jump function
function handleJump(e) {
    if(e.code !== "Space") return

    timeSinceLastJump = 0
}