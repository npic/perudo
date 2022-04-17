import { range, product } from '../util'
import { Die, dieMatches, DieSide, dieSideToNumber, MAX_SIDES } from '../player/Die'

export interface Bet {
    quantity: number,
    dieSide: DieSide,
}

export function makeBet(quantity: number, dieSide: DieSide): Bet {
    return {
        quantity: quantity,
        dieSide: dieSide,
    }
}

export function betToNumber(bet: Bet) {
    return (bet.dieSide === DieSide.Joker ? bet.quantity * 2 + 1 : bet.quantity) * 10 + dieSideToNumber(bet.dieSide)
}

export function compareBets(betA: Bet, betB: Bet) {
    return betToNumber(betA) - betToNumber(betB)
}

export function* betGenerator(startingBet: Bet, maxQuantity: number, isMaputoRound: boolean) {
    const sideGenerator = function*(withJokers: boolean) {
        while (true) {
            yield (withJokers ? DieSide.Joker : DieSide.One)
            yield DieSide.Two
            yield DieSide.Three
            yield DieSide.Four
            yield DieSide.Five
            yield DieSide.Six
        }
    }
    const sides = sideGenerator(!isMaputoRound)
    const allBets: Bet[] =
        range(maxQuantity * MAX_SIDES)
            .map((i) => ({
                quantity: Math.floor(i / MAX_SIDES) + 1,
                dieSide: sides.next().value
            }))
            .filter((bet) => {
                const onlyHigherBetsRule = compareBets(bet, startingBet) > 0
                const firstBetIsNotAJokerRule = startingBet.quantity === 0 ? bet.dieSide !== DieSide.Joker : true
                const maputoRule = isMaputoRound && startingBet.quantity > 0 ? bet.dieSide === startingBet.dieSide : true
                
                return onlyHigherBetsRule
                    && firstBetIsNotAJokerRule
                    && maputoRule
            })
            .sort(compareBets)
    for (let bet of allBets) {
        yield bet
    }
}

export function calculateBetProbability(bet: Bet, knownDice: Die[], remainingDiceCount: number, withJokers: boolean) {
    const unknownDiceCount = remainingDiceCount - knownDice.length

    const knownDiceBonus =
        knownDice
            .filter((die) => dieMatches(die, bet.dieSide))
            .length
    
    if (knownDiceBonus >= bet.quantity) {
        // if we've got enough dice on our own already, the probability is 100%
        return 1.0
    }

    const factorial = (x: number) =>
        range(x)
            .map((element) => BigInt(element === 0 ? x : element))
            .reduce(product, BigInt(1))
    
    const numberOfCombinations = (totalNumberOfElements: number, numberOfChosenElements: number) =>
        Number(
            factorial(totalNumberOfElements)
            / (
                factorial(numberOfChosenElements)
                * factorial(totalNumberOfElements - numberOfChosenElements)
            )
        )
    
    const exactlyNSameValuesProbability = (N: number) => {
        let numberOfGoodCases = (bet.dieSide === DieSide.Joker || !withJokers) ? 1.0 : 2.0
        return numberOfCombinations(unknownDiceCount, N)
            * (numberOfGoodCases / MAX_SIDES) ** N
            * ((MAX_SIDES - numberOfGoodCases) / MAX_SIDES) ** (unknownDiceCount - N)
    }

    let result = 0.0
    for (let N = bet.quantity - knownDiceBonus; N <= unknownDiceCount; N++) {
        result += exactlyNSameValuesProbability(N)
    }
    return result
}