# Perudo

Play now! https://npic.github.io/perudo/

Perudo is a dice game originated in South America. It is also known as "Dudo", "Cacho", "Pico", "Bluff", "Liar's Dice", etc.

Basically, players roll their dice, keeping them concealed from other players, and then they make increasing bids on how many dice of a certain value all players have across the board until someone makes a call. Then everyone reveals their dice, and if the last bet was correct, the caller loses the round, otherwise, the one who made the last bet loses.

Please refer to this Wikipedia article to get the general sense of the game: https://en.wikipedia.org/wiki/Dudo

## Ruleset used

The complete set of rules used in this implementation is described here (in Russian): http://perudo.ru/club/game/

In short terms:
* 2-6 players, each has 5 starting dice
* Round loss always results in 1 die penalty
* A normal round can NOT start with a wildcard ("Joker" or "Ace") bid
* No "Calza" (or "Spot On") rule
* "Palifico" is called "Maputo" here. The conditions to play a Maputo round are:
    * The player who lost the last round has only one die remaining
    * The player had NOT started a Maputo round before
    * If there are only two players remaining, Maputo rounds aren't played
    * If there are only three players remaining, and everyone has one die each, Maputo round isn't played

## Tech stack

* Typescript
* React
* Redux + Redux-Toolkit
* Bootstrap + Bootstrap-Icons

## App icon attribution

The app icon is part of Circle Icons pack by Nick Roach: https://www.iconfinder.com/iconsets/circle-icons-1