let deltaN = [], 
    parametersFake,

    round = 0, 
    variableGuard = [], 
    end = 0

function turningDeltaIntoPolynomial(delta, parametersOriginal) {
    let firstKeeper = [],
        multiplicationKeeper = [],
        polynomial = ``

    for (let index = 0; index < delta.length; index++) {

        firstKeeper.push(`(x - ${ parametersOriginal.x[index] })`)
        multiplicationKeeper.push(firstKeeper.slice(0, index + 1))

        polynomial += ` + ${ multiplicationKeeper[index] } * ${ delta[index][0] }`

    }

    polynomial = `${ parametersOriginal.fX[0] }${ polynomial }`.replace(/,/g, "*").replace(/ /g, "")
    return polynomial
}

function updateDenominatorSecondRound(value) {
    parametersFake.xFake.push([Math.max.apply(null, value), Math.min.apply(null, value)])
}

function calculatePolinomialNewton(values) {
    const resultFormula = (values.numerator[0] - values.numerator[1]) / (values.denominator[0] - values.denominator[1])
    return resultFormula
}

function main(parametersOriginal) {
    parametersFake = parametersOriginal
    parametersFake.xFake = []

    while (true) {
        if (end === 1) {
            break
        } else {

            deltaN.push([])

            if (deltaN.length === 1) {

                for (let counter = 0; counter < parametersFake.fX.length - 1; counter++) {

                    deltaN[deltaN.length - 1].push(calculatePolinomialNewton({
                        numerator: [parametersFake.fX[counter + 1], parametersFake.fX[counter]],
                        denominator: [parametersFake.x[counter + 1], parametersFake.x[counter]]
                    }))

                    round++
                    variableGuard.push(parametersFake.x[counter + 1], parametersFake.x[counter])

                    if (round === 2 || variableGuard.length === 4) {

                        updateDenominatorSecondRound(variableGuard)
                        variableGuard.splice(0, 2), round = 0

                    }
                }

                variableGuard = []
                
            } else if (deltaN[deltaN.length - 2].length > 2) {

                for (let counter = 0; counter < deltaN[deltaN.length - 2].length - 1; counter++) {

                    deltaN[deltaN.length - 1].push(calculatePolinomialNewton({
                        numerator: [deltaN[deltaN.length - 2][counter + 1], deltaN[deltaN.length - 2][counter]],
                        denominator: parametersFake.xFake[counter]
                    }))

                    round++, variableGuard.push(parametersFake.xFake[counter][0], parametersFake.xFake[counter][1])
                    parametersFake.xFake[counter] = [0, 0]

                    if (round === 2 || variableGuard.length === 4) {

                        updateDenominatorSecondRound(variableGuard)
                        variableGuard.splice(0, 2), round = 0

                    } 
                }
                
                while (parametersFake.xFake[0][0] === 0 && parametersFake.xFake[0][1] === 0){
                    parametersFake.xFake.shift()
                }

            } else {

                deltaN[deltaN.length - 1].push(calculatePolinomialNewton({
                    numerator: [deltaN[deltaN.length - 2][1], deltaN[deltaN.length - 2][0]],
                    denominator: parametersFake.xFake[0]
                }))

            }
        }

        end = deltaN[deltaN.length - 1].length

    }

    const polynomial = turningDeltaIntoPolynomial(deltaN, parametersOriginal)
    return { delta: deltaN, polynomial: polynomial } 

}

module.exports = main