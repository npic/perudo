import { SettingsSlice } from 'app/slices'
import i18n from 'app/i18n'
import { GameRoom, PlayerType, PlayerBasicProperties } from 'core/types'
import { GameRoomUtils, PlayerUtils, range, shuffle } from 'core/utils'

function* playerNameGenerator() {
    const playerNames = shuffle(i18n.t('playerNames.ai', { returnObjects: true }))
    for (const playerName of playerNames) {
        yield playerName
    }
}

class GameRoomBuilder {
    playerNames: Generator
    gameRoom: GameRoom
    
    constructor() {
        this.playerNames = playerNameGenerator()
        this.gameRoom = GameRoomUtils.makeGameRoom()
    }

    addPlayer(playerInfo: PlayerBasicProperties) {
        const finalName = playerInfo.name || this.playerNames.next().value
        this.gameRoom.players.push(PlayerUtils.makePlayer({ ...playerInfo, name: finalName }))
    }

    shufflePlayers() {
        this.gameRoom.players = shuffle(this.gameRoom.players)
    }
    
    pickFirstPlayer() {
        this.gameRoom.currentTurnPlayerIndex = 0
    }
}

export default class GameRoomBuilderDirector {
    builder: GameRoomBuilder

    constructor() {
        this.builder = new GameRoomBuilder()
    }

    buildPlayerRoom(gameSettings: SettingsSlice.SettingsState) {
        this.builder = new GameRoomBuilder()
        
        range(gameSettings.humanPlayers)
            .forEach((i) => this.builder.addPlayer({
                name: gameSettings.humanPlayerNames[i],
                type: PlayerType.Human,
            }))
        
        range(gameSettings.aiPlayers)
            .forEach(() => this.builder.addPlayer({
                name: '',
                type: PlayerType.AI,
                aiRiskLowerBound: gameSettings.aiRiskLowerBound,
                aiRiskUpperBound: gameSettings.aiRiskUpperBound,
                aiTopBidsSimilarityThreshold: gameSettings.aiTopBidsSimilarityThreshold,
                aiDelay: gameSettings.aiDelay,
            }))

        this.builder.shufflePlayers()
        this.builder.pickFirstPlayer()
        return this.builder.gameRoom
    }
}