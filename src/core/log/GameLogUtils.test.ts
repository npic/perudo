import { GameEventType, PlayerType, DieFace } from 'core/types'
import { GameLogUtils, GameRoomUtils, PlayerUtils } from 'core/utils'

test('Test makeGameLog and addEvent', () => {
    const testLog = GameLogUtils.makeGameLog()
    expect(testLog.length).toBe(0)

    GameLogUtils.addEvent(testLog, { type: GameEventType.GameStart, playerNames: [] })
    expect(testLog.length).toBe(1)

    GameLogUtils.addEvent(testLog, { type: GameEventType.GameEnd })
    expect(testLog.length).toBe(2)
    expect(testLog[0].type).toEqual(GameEventType.GameStart)
    expect(testLog[1].type).toEqual(GameEventType.GameEnd)
})

test('Test logGameStart', () => {
    const testLog = GameLogUtils.makeGameLog()
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]
    testRoom.isMaputoRound = false
    testRoom.currentRoundNumber = 1

    GameLogUtils.logGameStart(testLog, testRoom)
    expect(testLog.length).toBe(2)
    expect(testLog[0]).toEqual({ type: GameEventType.GameStart, playerNames: ['Player 1', 'Player 2', 'Player 3'] })
    expect(testLog[1]).toEqual({ type: GameEventType.RoundStart, roundNumber: 1, isMaputo: false })
})

test('Test logRoundStart', () => {
    const testLog = GameLogUtils.makeGameLog()
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.isMaputoRound = true
    testRoom.currentRoundNumber = 5

    GameLogUtils.logRoundStart(testLog, testRoom)
    expect(testLog.length).toBe(1)
    expect(testLog[0]).toEqual({ type: GameEventType.RoundStart, roundNumber: 5, isMaputo: true })
})

test('Test logBid', () => {
    const testLog = GameLogUtils.makeGameLog()
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]
    testRoom.previousTurnPlayerIndex = 1
    testRoom.currentBid = { quantity: 5, dieFace: DieFace.Joker }

    GameLogUtils.logBid(testLog, testRoom)
    expect(testLog.length).toBe(1)
    expect(testLog[0]).toEqual({ type: GameEventType.Bid, playerName: 'Player 2', bidQuantity: 5, bidDieFace: DieFace.Joker })
})

test('Test logCheck', () => {
    const testLog = GameLogUtils.makeGameLog()
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]
    testRoom.players[0].diceOwned = 5
    testRoom.players[0].dice = [
        { value: DieFace.Two },
        { value: DieFace.Three },
        { value: DieFace.Four },
        { value: DieFace.Five },
        { value: DieFace.Six },
    ]
    testRoom.players[1].diceOwned = 3
    testRoom.players[1].dice = [
        { value: DieFace.Four },
        { value: DieFace.Five },
        { value: DieFace.Six },
    ]
    testRoom.players[2].diceOwned = 1
    testRoom.players[2].dice = [
        { value: DieFace.Joker },
    ]
    testRoom.currentRoundNumber = 7
    testRoom.isMaputoRound = false
    testRoom.currentTurnPlayerIndex = 0
    testRoom.previousTurnPlayerIndex = 2
    testRoom.currentBid = { quantity: 8, dieFace: DieFace.Joker }

    GameLogUtils.logCheck(testLog, testRoom)
    expect(testLog.length).toBe(5)
    expect(testLog[0]).toEqual({ type: GameEventType.Check, playerName: 'Player 1' })
    expect(testLog[1]).toEqual({
        type: GameEventType.RevealAllDice,
        roundNumber: 7,
        matchingDieFace: DieFace.Joker,
        playerDice: [
            { playerName: 'Player 1', dice: [ DieFace.Two, DieFace.Three, DieFace.Four, DieFace.Five, DieFace.Six ] },
            { playerName: 'Player 2', dice: [ DieFace.Four, DieFace.Five, DieFace.Six ] },
            { playerName: 'Player 3', dice: [ DieFace.Joker ] },
        ]
    })
    expect(testLog[2]).toEqual({ type: GameEventType.RoundOutcome, loserName: 'Player 3' })
    expect(testLog[3]).toEqual({ type: GameEventType.PlayerLost, loserName: 'Player 3' })
    expect(testLog[4]).toEqual({ type: GameEventType.RoundEnd, roundNumber: 7 })
})

test('Test logGameOver', () => {
    const testLog = GameLogUtils.makeGameLog()
    const testRoom = GameRoomUtils.makeGameRoom()
    testRoom.players = [
        PlayerUtils.makePlayer({ name: 'Player 1', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 2', type: PlayerType.Human }),
        PlayerUtils.makePlayer({ name: 'Player 3', type: PlayerType.Human }),
    ]
    testRoom.currentTurnPlayerIndex = 1

    GameLogUtils.logGameOver(testLog, testRoom)
    expect(testLog.length).toBe(2)
    expect(testLog[0]).toEqual({ type: GameEventType.PlayerWon, winnerName: 'Player 2' })
    expect(testLog[1]).toEqual({ type: GameEventType.GameEnd })
})