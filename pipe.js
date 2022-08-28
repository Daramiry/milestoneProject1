// create a variable for pipe height and width
const HOLE_HEIGHT = 200
const PIPE_WIDTH = 120

// create variables to determine how and when the pipes should be created
let pipes = []
const PIPE_INTERVAL = 1500
const PIPE_SPEED = .75
let timeSinceLastPipe

// keeps score
let pipeScore = 0

// using export to transfer files between other 'JS' files 
// counts passed pipes
export function setupPipes() {
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
    pipes.forEach(pipe => pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL
    pipeScore = 0
}

export function updatePipes(delta) {
    timeSinceLastPipe += delta

    if (timeSinceLastPipe > PIPE_INTERVAL ) {
              timeSinceLastPipe -= PIPE_INTERVAL
    createPipe()
}
    pipes.forEach(pipe => {
        if ( pipe.left + PIPE_WIDTH < 0 ) {
            pipeScore++
            return pipe.remove()
        }
       pipe.left = pipe.left - delta * PIPE_SPEED
    })
    }
  
export function getPipeScore() {
    return pipeScore
}

export function pipeRects() {
    return pipes.flatMap(pipe => pipe.rects())
}
// end of export 

// adds collision, and removes pipes
function createPipe() {
    const pipeElem = document.createElement("div")
    const topElem = createPipeSegment("top")
    const bottomElem = createPipeSegment("bottom")
    pipeElem.append(topElem)
    pipeElem.append(bottomElem)
    pipeElem.classList.add("pipe")
    pipeElem.style.setProperty(
        "--hole-top",
         randomNumberBetween(
            HOLE_HEIGHT * 1.5,
         window.innerHeight - HOLE_HEIGHT * 0.5
         )
    )
    const pipe = {
        get left() {
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
        },
        set left(value) {
            pipeElem.style.setProperty("--pipe-left", value)
        },
        remove() {
            pipes = pipes.filter(p => p !== pipe)
            pipeElem.remove()
        },
        rects() {
            return [ 
                topElem.getBoundingClientRect(),
                bottomElem.getBoundingClientRect(),
            ]
        }
    }
    pipe.left = window.innerWidth
    document.body.append(pipeElem)
    pipes.push(pipe)
}

function createPipeSegment(position) {
    const segment = document.createElement("div")
    segment.classList.add("segment", position)
    return segment
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}