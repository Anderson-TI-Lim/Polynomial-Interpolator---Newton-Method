const interpoladorNewton = require("./interpoladorNewton")
const readline = require("readline-sync")

const parameters = {}

function drawInit() {
    console.log("---------------------------------------------")
    console.log("   Polynomial Interpolator - Newton Method   ")
    console.log("---------------------------------------------")
}

function getValueXAndValueFX() {
    parameters.x = readline.question("Type values X: ").replace(/ /g, "").split(",")
    parameters.fX = readline.question("Type value f(x): ").replace(/ /g, "").split(",")
}

function start() {
    drawInit()
    getValueXAndValueFX()

    const deltaAndPolynomial = interpoladorNewton(parameters)

    console.log("---------------")
    console.log("   Answers")
    console.log("---------------")
    console.log(`Deltas: `)
    console.log(deltaAndPolynomial.delta)
    console.log(`Polynomial: ${ deltaAndPolynomial.polynomial }`)
}

start()