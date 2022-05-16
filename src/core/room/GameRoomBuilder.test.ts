import { PlayerType } from 'core/types'
import { GameRoomBuilderDirector, BidUtils } from 'core/utils'

test('Test GameRoomBuilderDirector', () => {
    const testBuilderDirector = new GameRoomBuilderDirector()
    const testRoom = testBuilderDirector.buildPlayerRoom({
        humanPlayers: 2,
        humanPlayerNames: [ 'Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6' ],
        aiPlayers: 4,
        aiRiskLowerBound: 30,
        aiRiskUpperBound: 50,
        aiTopBidsSimilarityThreshold: 5,
        aiDelay: 100,
    })

    expect(BidUtils.isNullBid(testRoom.currentBid)).toBe(true)
    expect(testRoom.isMaputoRound).toBe(false)
    expect(testRoom.roundEnded).toBe(false)
    
    expect(testRoom.players.reduce(
        (acc, cur) => cur.type === PlayerType.AI ? { ...acc, ais: acc.ais + 1 } : { ...acc, humans: acc.humans + 1 },
        { ais: 0, humans: 0 }
    )).toEqual({ ais: 4, humans: 2 })
    
    expect(testRoom.players
        .filter((player) => player.type === PlayerType.Human)
        .map((player) => player.name)
        .sort()
    ).toEqual([ 'Test 1', 'Test 2' ])

    expect(testRoom.players
        .filter((player) => player.type === PlayerType.AI)
        .every((player) =>
            player.name.length > 0
            && player.aiRiskLowerBound === 30
            && player.aiRiskUpperBound === 50
            && player.aiTopBidsSimilarityThreshold === 5
            && player.aiDelay === 100)
    ).toBe(true)
})