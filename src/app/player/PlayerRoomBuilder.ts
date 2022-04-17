import { PlayerRoom, makePlayerRoom } from './PlayerRoom'
import { PlayerType, makePlayer } from './Player'
import { shuffle } from '../util'

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
    ])
    for (let playerName of playerNames) {
        yield playerName
    }
}

export interface BasicPlayerInfo {
    playerName: string,
    playerType: PlayerType,
    aiPlayerRiskLowerBound: number,
    aiPlayerRiskUpperBound: number,
    aiDelay: number,
}

class PlayerRoomBuilder {
    playerNameGen: Generator
    playerRoom: PlayerRoom
    
    constructor() {
        this.playerNameGen = playerNameGenerator()
        this.playerRoom = makePlayerRoom()
    }

    addPlayer(playerInfo: BasicPlayerInfo) {
        let finalName = playerInfo.playerName || this.playerNameGen.next().value
        this.playerRoom.players.push(makePlayer(finalName, playerInfo.playerType, playerInfo.aiPlayerRiskLowerBound, playerInfo.aiPlayerRiskUpperBound, playerInfo.aiDelay))
    }

    shufflePlayers() {
        this.playerRoom.players = shuffle(this.playerRoom.players)
        this.playerRoom.currentTurnPlayerIndex = 0
    }
}

export default class PlayerRoomBuilderDirector {
    builder: PlayerRoomBuilder

    constructor() {
        this.builder = new PlayerRoomBuilder()
    }

    buildPlayerRoom(playersInfo: BasicPlayerInfo[]) {
        this.builder = new PlayerRoomBuilder()
        playersInfo.forEach((playerInfo) => this.builder.addPlayer(playerInfo))
        this.builder.shufflePlayers()
        return this.builder.playerRoom
    }
}