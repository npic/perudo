import { range, shuffle } from '../util'

import GameRoom from './GameRoom'
import * as GameRoomUtils from './GameRoomUtils'

import PlayerType from '../player/PlayerType'
import PlayerBasicProperties from '../player/PlayerBasicProperties'
import * as PlayerUtils from '../player/PlayerUtils'

import { SettingsState } from '../../features/settings/SettingsSlice'

function* playerNameGenerator() {
    const playerNames = shuffle([
        'MM',
        'Mironchik',
        'Anna Tutlberg',
        'Henrik Tutlberg',
        'Grisha Rotov',
        'Shura Stone',
        'Valery Solovey',
        'Careless Trader',
        'Arguyendiy',
        'Billy Herrington',
        'Van Darkholme',
        'Ricardo Milos',
        'Vladimir Khil',
        'Crimson Fantomas',
        'Alexandra ._. Numero',
        'Singer-Prophet Sunboy',
        'Zlatko Slatko',
        'Slavko Mravko',
    ])
    for (let playerName of playerNames) {
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
        let finalName = playerInfo.name || this.playerNames.next().value
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

    buildPlayerRoom(gameSettings: SettingsState) {
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