import { PlayerType, DieFace } from 'core/types'
import { PlayerUtils, DiceSetUtils } from 'core/utils'

test('Test makePlayer', () => {
    const testPlayer = PlayerUtils.makePlayer({
        name: 'Player',
        type: PlayerType.AI,
        aiRiskLowerBound: 25,
        aiRiskUpperBound: 55,
        aiTopBidsSimilarityThreshold: 15,
        aiDelay: 2000,
    })
    expect(testPlayer).toEqual({
        name: 'Player',
        type: PlayerType.AI,
        diceOwned: DiceSetUtils.STARTING_DICE_NUMBER,
        dice: [],
        hadMaputoRound: false,
        aiRiskLowerBound: 25,
        aiRiskUpperBound: 55,
        aiRiskCurrentValue: 25,
        aiTopBidsSimilarityThreshold: 15,
        aiDelay: 2000,
    })
})

test('Test rollDice', () => {
    const testPlayer = PlayerUtils.makePlayer({ name: 'Player', type: PlayerType.Human })
    const withJokers = true
    let jokerSeen = false
    let oneSeen = false
    for (let i = 0; i < 10000; i++) {
        PlayerUtils.rollDice(testPlayer, withJokers)
        expect(testPlayer.dice.length).toBe(testPlayer.diceOwned)
        expect(testPlayer.dice.every((die) => die.value in DieFace)).toBe(true)
        testPlayer.dice.forEach((die) => {
            if (die.value === DieFace.Joker) {
                jokerSeen = true
            } else if (die.value === DieFace.One) {
                oneSeen = true
            }
        })
    }
    expect(jokerSeen).toBe(withJokers)
    expect(oneSeen).toBe(!withJokers)
})

test('Test isAlive', () => {
    const testPlayer = PlayerUtils.makePlayer({ name: 'Player', type: PlayerType.Human })
    expect(PlayerUtils.isAlive(testPlayer)).toBe(true)
    
    testPlayer.diceOwned = 1
    expect(PlayerUtils.isAlive(testPlayer)).toBe(true)
    
    testPlayer.diceOwned = 0
    expect(PlayerUtils.isAlive(testPlayer)).toBe(false)
    
    testPlayer.diceOwned = -1
    expect(PlayerUtils.isAlive(testPlayer)).toBe(false)
})