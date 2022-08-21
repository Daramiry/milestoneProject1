const HOLE_HEIGHT = 120
const pipes = []
const PipeInterval = 1500
const pipeSpeed = .75
let timeSinceLastPipe = 0

export function updatePipes(delta) {
    timeSinceLastPipe += delta

    if (timeSinceLastPipe > PipeInterval )
        timeSinceLastPipe -= PipeInterval
    createPipe()
}

pipes.forEach(pipe => {
    pipe.left = pipe.left - delta * pipeSpeed
})

function createPipe() {
    const pipeElem = document.createElement("div")
    const topElem = createPipeSegment("top")
    const bottomElem = createPipeSegment("bottom")
    pipeElem.append(topElem)
    pipeElem.append(bottomElem)
    pipeElem.classList.add("pipe")
    pipeElem.style.setProperty(
        "--hole-top",
         randomNumberBetween(HOLE_HEIGHT * 1.5,
         window.innerHeight - HOLE_HEIGHT * 0.5
         )
    )
    const pipe = {
        get left() {
            return parseFloat(getComputedStyle(pipeElem).getPropertyPriorityValue
            ("--pipe-left"))
        },
        set left(value) {
            pipeElem.style.setProperty("--pipe-left", value)
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