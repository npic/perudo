import { GameRoom, DieFace, PlayerType } from 'core/types'
import { GameRoomUtils, PlayerUtils, DiceSetUtils, BidUtils } from 'core/utils'

test('Test makeGameRoom', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    expect(testRoom).not.toBeFalsy()
})

test('Test rollDiceForAllPlayers', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.AI }),
    ]
    GameRoomUtils.rollDiceForAllPlayers(testRoom, !testRoom.isMaputoRound)

    expect(testRoom.players.every((player) => player.dice.length === player.diceOwned)).toBe(true)
})

test('Test prepareAIPlayers', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.AI, aiRiskLowerBound: 30, aiRiskUpperBound: 50 }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.AI, aiRiskLowerBound: 30, aiRiskUpperBound: 50 }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.AI, aiRiskLowerBound: 30, aiRiskUpperBound: 50 }),
        PlayerUtils.makePlayer({ name: 'Player 4', type: PlayerType.Human }),
    ]
    GameRoomUtils.prepareAIPlayers(testRoom)

    expect(testRoom.players[0].aiRiskCurrentValue).toBeGreaterThanOrEqual(30)
    expect(testRoom.players[0].aiRiskCurrentValue).toBeLessThanOrEqual(50)
    expect(testRoom.players[1].aiRiskCurrentValue).toBeGreaterThanOrEqual(30)
    expect(testRoom.players[1].aiRiskCurrentValue).toBeLessThanOrEqual(50)
    expect(testRoom.players[2].aiRiskCurrentValue).toBeGreaterThanOrEqual(30)
    expect(testRoom.players[2].aiRiskCurrentValue).toBeLessThanOrEqual(50)
    expect(testRoom.players[3].aiRiskCurrentValue).toBe(0)
})

test('Test isGameOver', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]
    expect(GameRoomUtils.isGameOver(testRoom)).toBe(false)

    testRoom.players[1].diceOwned = 0
    testRoom.players[2].diceOwned = 0
    expect(GameRoomUtils.isGameOver(testRoom)).toBe(true)
})

test('Test isHumanTurn and isAITurn', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.AI }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]

    testRoom.currentTurnPlayerIndex = 0
    expect(GameRoomUtils.isHumanTurn(testRoom)).toBe(true)
    expect(GameRoomUtils.isAITurn(testRoom)).toBe(false)

    testRoom.currentTurnPlayerIndex = 1
    expect(GameRoomUtils.isHumanTurn(testRoom)).toBe(false)
    expect(GameRoomUtils.isAITurn(testRoom)).toBe(true)
})

test('Test getTotalDiceCount', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.AI }),
    ]
    expect(GameRoomUtils.getTotalDiceCount(testRoom)).toBe(DiceSetUtils.STARTING_DICE_NUMBER * testRoom.players.length)
})

test('Test getTotalPoints and getLoserIndex', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.AI }),
    ]
    testRoom.players[0].dice = [
        { value: DieFace.Joker },
        { value: DieFace.Joker },
        { value: DieFace.Two },
        { value: DieFace.Two },
        { value: DieFace.Six },
    ]
    testRoom.players[1].dice = [
        { value: DieFace.Three },
        { value: DieFace.Three },
        { value: DieFace.Four },
        { value: DieFace.Five },
        { value: DieFace.Six },
    ]
    testRoom.players[2].dice = [
        { value: DieFace.Joker },
        { value: DieFace.Two },
        { value: DieFace.Two },
        { value: DieFace.Three },
        { value: DieFace.Five },
    ]
    testRoom.currentTurnPlayerIndex = 2
    testRoom.previousTurnPlayerIndex = 1
    testRoom.currentBid = BidUtils.makeBid(8, DieFace.Two)

    expect(GameRoomUtils.getTotalPoints(testRoom)).toBe(7)
    expect(GameRoomUtils.getLoserIndex(testRoom)).toBe(1)
})

test('Test startNextTurn', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.AI }),
    ]
    testRoom.players[1].diceOwned = 0
    testRoom.currentTurnPlayerIndex = 0
    testRoom.previousTurnPlayerIndex = 2

    GameRoomUtils.startNextTurn(testRoom, BidUtils.makeBid(5, DieFace.Five))
    expect(testRoom.currentTurnPlayerIndex).toBe(2)
    expect(testRoom.previousTurnPlayerIndex).toBe(0)
    expect(testRoom.currentBid.quantity).toBe(5)
    expect(testRoom.currentBid.dieFace).toBe(DieFace.Five)
})

test('Test endRound', () => {
    const testRoom = GameRoomUtils.makeGameRoom()
    GameRoomUtils.endRound(testRoom)
    expect(testRoom.roundEnded).toBe(true)
})

describe('Test startNextRound', () => {
    let testRoom: GameRoom
    
    beforeEach(() => {
        testRoom = GameRoomUtils.makeGameRoom()
        testRoom.players = [
            PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
            PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
            PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.AI }),
            PlayerUtils.makePlayer({ name: 'Player 4', type: PlayerType.AI }),
        ]
        testRoom.players[0].dice = [
            { value: DieFace.Joker },
            { value: DieFace.Joker },
            { value: DieFace.Two },
            { value: DieFace.Two },
            { value: DieFace.Six },
        ]
        testRoom.players[1].dice = [
            { value: DieFace.Three },
        ]
        testRoom.players[2].dice = []
        testRoom.players[3].dice = [
            { value: DieFace.Joker },
            { value: DieFace.Two },
        ]
        testRoom.players.forEach((player) => player.diceOwned = player.dice.length)
        testRoom.currentRoundNumber = 15
        testRoom.currentTurnPlayerIndex = 3
        testRoom.previousTurnPlayerIndex = 1
    })

    test('Player 2 loses and quits', () => {
        testRoom.currentBid = BidUtils.makeBid(8, DieFace.Two)
        GameRoomUtils.startNextRound(testRoom)

        expect(BidUtils.isNullBid(testRoom.currentBid)).toBe(true)
        expect(testRoom.currentRoundNumber).toBe(16)
        expect(testRoom.currentTurnPlayerIndex).toBe(3)
        expect(testRoom.isMaputoRound).toBe(false)
        expect(testRoom.roundEnded).toBe(false)
        expect(testRoom.players[1].diceOwned).toBe(0)
    })

    test('Player 2 wins, Maputo starts', () => {
        testRoom.currentBid = BidUtils.makeBid(6, DieFace.Two)
        GameRoomUtils.startNextRound(testRoom)
        
        expect(BidUtils.isNullBid(testRoom.currentBid)).toBe(true)
        expect(testRoom.currentRoundNumber).toBe(16)
        expect(testRoom.currentTurnPlayerIndex).toBe(3)
        expect(testRoom.isMaputoRound).toBe(true)
        expect(testRoom.roundEnded).toBe(false)
        expect(testRoom.players[1].diceOwned).toBe(1)
        expect(testRoom.players[3].diceOwned).toBe(1)
    })

    test('Player 2 wins, Player 1 does not exist, Maputo does not start', () => {
        testRoom.players[0].dice = []
        testRoom.players[0].diceOwned = 0
        testRoom.currentBid = BidUtils.makeBid(2, DieFace.Two)
        GameRoomUtils.startNextRound(testRoom)
        
        expect(BidUtils.isNullBid(testRoom.currentBid)).toBe(true)
        expect(testRoom.currentRoundNumber).toBe(16)
        expect(testRoom.currentTurnPlayerIndex).toBe(3)
        expect(testRoom.isMaputoRound).toBe(false)
        expect(testRoom.roundEnded).toBe(false)
        expect(testRoom.players[1].diceOwned).toBe(1)
        expect(testRoom.players[3].diceOwned).toBe(1)
    })

    test('Player 2 wins, Player 1 has one die, Maputo does not start', () => {
        testRoom.players[0].dice = [ { value: DieFace.Joker } ]
        testRoom.players[0].diceOwned = 1
        testRoom.currentBid = BidUtils.makeBid(2, DieFace.Joker)
        GameRoomUtils.startNextRound(testRoom)
        
        expect(BidUtils.isNullBid(testRoom.currentBid)).toBe(true)
        expect(testRoom.currentRoundNumber).toBe(16)
        expect(testRoom.currentTurnPlayerIndex).toBe(3)
        expect(testRoom.isMaputoRound).toBe(false)
        expect(testRoom.roundEnded).toBe(false)
        expect(testRoom.players[1].diceOwned).toBe(1)
        expect(testRoom.players[3].diceOwned).toBe(1)
    })
})