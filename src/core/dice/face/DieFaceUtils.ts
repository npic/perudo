import DieFace from './DieFace'

export function toBootstrapIconClass(dieFace: DieFace) {
    return dieFace === DieFace.Joker ? 'bi-star-fill' : `bi-dice-${dieFace}-fill`
}

export function toNumber(dieFace: DieFace) {
    return dieFace === DieFace.Joker ? 0 : Number(dieFace)
}
