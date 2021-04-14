namespace SpriteKind {
    export const Bomb = SpriteKind.create()
    export const BombInExplosion = SpriteKind.create()
    export const Door = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BombInExplosion, function (sprite, otherSprite) {
    game.over(false)
})
function turnLeft (sprite: Sprite) {
    if (sprite.vx == 0 && sprite.vy < 0) {
        sprite.setVelocity(0 - enemySpeed, 0)
    } else if (sprite.vx < 0 && sprite.vy == 0) {
        sprite.setVelocity(0, enemySpeed)
    } else if (sprite.vx == 0 && sprite.vy > 0) {
        sprite.setVelocity(enemySpeed, 0)
    } else {
        sprite.setVelocity(0, 0 - enemySpeed)
    }
}
function turnRandomly (ghost: Sprite) {
    if (Math.percentChance(50)) {
        turnLeft(ghost)
    } else {
        turnRight(ghost)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bombSprite = sprites.create(img`
        . . . . . . . e c 7 . . . . . . 
        . . . . e e e c 7 7 e e . . . . 
        . . c e e e e c 7 e 2 2 e e . . 
        . c e e e e e c 6 e e 2 2 2 e . 
        . c e e e 2 e c c 2 4 5 4 2 e . 
        c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
        c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
        c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
        . e e e 2 2 2 2 2 2 2 2 2 4 e . 
        . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
        . . 2 e e 2 2 2 2 2 4 4 2 e . . 
        . . . 2 2 e e 4 4 4 2 e e . . . 
        . . . . . 2 2 e e e e . . . . . 
        `, SpriteKind.Bomb)
    bombTile = scene.getTile(cubicbird.tileColumnOfSprite(playerSprite), cubicbird.tileRowOfSprite(playerSprite))
    cubicbird.setTile(bombTile, 2)
    bombTile.place(bombSprite)
    bombSprite.lifespan = 3000
})
sprites.onDestroyed(SpriteKind.Bomb, function (sprite) {
    bombTile = scene.getTile(cubicbird.tileColumnOfSprite(sprite), cubicbird.tileRowOfSprite(sprite))
    cubicbird.setTile(bombTile, 0)
    bombExplosionCenter = sprites.create(img`
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        . . 2 2 3 3 1 1 1 1 3 3 2 2 . . 
        . 2 2 3 3 3 1 1 1 1 3 3 3 2 2 . 
        2 2 3 3 3 3 1 1 1 1 3 3 3 3 2 2 
        3 3 3 3 3 1 1 1 1 1 1 3 3 3 3 3 
        3 3 3 3 1 1 1 1 1 1 1 1 3 3 3 3 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        3 3 3 3 1 1 1 1 1 1 1 1 3 3 3 3 
        3 3 3 3 3 1 1 1 1 1 1 3 3 3 3 3 
        2 2 3 3 3 3 1 1 1 1 3 3 3 3 2 2 
        . 2 2 3 3 3 1 1 1 1 3 3 3 2 2 . 
        . . 2 2 3 3 1 1 1 1 3 3 2 2 . . 
        . . . 2 3 3 1 1 1 1 3 3 2 . . . 
        `, SpriteKind.BombInExplosion)
    bombTile.place(bombExplosionCenter)
    bombExplosionCenter.lifespan = explodeTimeSpan
    handleExplosion(cubicbird.tileColumnOfSprite(sprite), cubicbird.tileRowOfSprite(sprite), 0, 1)
    handleExplosion(cubicbird.tileColumnOfSprite(sprite), cubicbird.tileRowOfSprite(sprite), 1, 1)
    handleExplosion(cubicbird.tileColumnOfSprite(sprite), cubicbird.tileRowOfSprite(sprite), 2, 1)
    handleExplosion(cubicbird.tileColumnOfSprite(sprite), cubicbird.tileRowOfSprite(sprite), 3, 1)
})
scene.onHitTile(SpriteKind.Enemy, 2, function (sprite) {
    turnRandomly(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door, function (sprite, otherSprite) {
    if (sprites.allOfKind(SpriteKind.Enemy).length == 0) {
        game.over(true)
    }
})
function setUpScene () {
    scene.setBackgroundColor(7)
    scene.setTileMap(img`
        f f f f f f f f f f f f f f f f f f f 
        f 3 3 . . . . . . . . . . . . . . . f 
        f 3 f . f . f . f . f . f . f . f . f 
        f . . . . . . . . . . . . . . . . . f 
        f . f . f . f . f . f . f . f . f . f 
        f . . . . . . . . . . . . . . . . . f 
        f . f . f . f . f . f . f . f . f . f 
        f . . . . . . . . . . . . . . . . . f 
        f . f . f . f . f . f . f . f . f . f 
        f . . . . . . . . . . . . . . . . . f 
        f . f . f . f . f . f . f . f . f . f 
        f . . . . . . . . . . . . . . . . . f 
        f . f . f . f . f . f . f . f . f . f 
        f . . . . . . . . . . . . . . . . . f 
        f f f f f f f f f f f f f f f f f f f 
        `)
    placeBricks()
    scene.setTile(15, img`
        b d d d d d d d d d d d d d d c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        d b b b b b b b b b b b b b b c 
        c c c c c c c c c c c c c c c a 
        `, true)
    scene.setTile(1, img`
        d 1 d d d d d d d 1 d d d d d d 
        d 1 d d d d d d d 1 d d d d d d 
        d 1 d d d d d d d 1 d d d d d d 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        d d d d d 1 d d d d d d d 1 d d 
        d d d d d 1 d d d d d d d 1 d d 
        d d d d d 1 d d d d d d d 1 d d 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        d 1 d d d d d d d 1 d d d d d d 
        d 1 d d d d d d d 1 d d d d d d 
        d 1 d d d d d d d 1 d d d d d d 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        d d d d d 1 d d d d d d d 1 d d 
        d d d d d 1 d d d d d d d 1 d d 
        d d d d d 1 d d d d d d d 1 d d 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        `, true)
    scene.setTile(2, img`
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        `, true)
    scene.setTile(3, img`
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        `, false)
}
sprites.onOverlap(SpriteKind.BombInExplosion, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(10)
})
function placeBricks () {
    currentBrickAmount = 0
    emptyTiles = scene.getTilesByType(0)
    for (let value of emptyTiles) {
        let j = 0
        if (Math.percentChance((totalBrickAmount - currentBrickAmount) / (emptyTiles.length - j) * 100)) {
            cubicbird.setTile(value, 1)
            currentBrickAmount += 1
        }
    }
}
function destroyWall (col: number, row: number) {
    cubicbird.setTile(scene.getTile(col, row), 0)
    if (sprites.allOfKind(SpriteKind.Door).length == 0 && randint(0, scene.getTilesByType(1).length) == 0) {
        // place door
        doorSprite = sprites.create(img`
            . . . e e e e e e e e e e . . . 
            . . e e 8 8 8 8 8 8 8 8 e e . . 
            . e e 8 8 e e 8 8 e e 8 8 e e . 
            e e 8 8 e e e 8 8 e e e 8 8 e e 
            e 8 8 e e e e 8 8 e e e e 8 8 e 
            e 8 e e e e e 8 8 e e e e e 8 e 
            e 8 8 8 8 8 8 8 8 8 8 8 8 8 8 e 
            e 8 e e e e e 8 8 e e e e e 8 e 
            e 8 e e e e 5 8 8 5 e e e e 8 e 
            e 8 e e e e 5 8 8 5 e e e e 8 e 
            e 8 e e e e 5 8 8 5 e e e e 8 e 
            e 8 8 8 8 8 8 8 8 8 8 8 8 8 8 e 
            e 8 e e e e e 8 8 e e e e e 8 e 
            e 8 e e e e e 8 8 e e e e e 8 e 
            e 8 8 8 8 8 8 8 8 8 8 8 8 8 8 e 
            e e e e e e e e e e e e e e e e 
            `, SpriteKind.Door)
        scene.getTile(col, row).place(doorSprite)
    }
}
function createEnemy () {
    for (let index = 0; index < 4; index++) {
        ghostSprite = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        ghostSprite.vx = 40
        scene.placeOnRandomTile(ghostSprite, 0)
    }
}
function turnRight (sprite: Sprite) {
    if (sprite.vx == 0 && sprite.vy < 0) {
        sprite.setVelocity(enemySpeed, 0)
    } else if (sprite.vx < 0 && sprite.vy == 0) {
        sprite.setVelocity(0, 0 - enemySpeed)
    } else if (sprite.vx == 0 && sprite.vy > 0) {
        sprite.setVelocity(0 - enemySpeed, 0)
    } else {
        sprite.setVelocity(0, enemySpeed)
    }
}
function handleExplosion (col: number, row: number, direction: number, depth: number) {
    if (direction == 0) {
        row += -1
    } else if (direction == 1) {
        col += 1
    } else if (direction == 2) {
        row += 1
    } else if (direction == 3) {
        col += -1
    }
    if (cubicbird.tileIsIndex(scene.getTile(col, row), 1)) {
        destroyWall(col, row)
    } else if (cubicbird.tileIsIndex(scene.getTile(col, row), 0) || cubicbird.tileIsIndex(scene.getTile(col, row), 3)) {
        if (direction == 0) {
            explodedBombSprite = sprites.create(bombExplosionUp, SpriteKind.BombInExplosion)
        } else if (direction == 1) {
            explodedBombSprite = sprites.create(bombExplosionRight, SpriteKind.BombInExplosion)
        } else if (direction == 2) {
            explodedBombSprite = sprites.create(bombExplosionDown, SpriteKind.BombInExplosion)
        } else {
            explodedBombSprite = sprites.create(bombExplosionLeft, SpriteKind.BombInExplosion)
        }
        explodedBombTile = scene.getTile(col, row)
        explodedBombTile.place(explodedBombSprite)
        explodedBombSprite.lifespan = explodeTimeSpan
        if (depth > 1) {
            handleExplosion(col, row, direction, depth - 1)
        }
    }
}
scene.onHitTile(SpriteKind.Enemy, 15, function (sprite) {
    turnRandomly(sprite)
})
scene.onHitTile(SpriteKind.Enemy, 1, function (sprite) {
    turnRandomly(sprite)
})
function setUpPlayer () {
    playerSprite = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(playerSprite)
    playerSpawnTile = scene.getTile(1, 1)
    playerSpawnTile.place(playerSprite)
    scene.cameraFollowSprite(playerSprite)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let playerSpawnTile: tiles.Tile = null
let explodedBombTile: tiles.Tile = null
let explodedBombSprite: Sprite = null
let col = 0
let row = 0
let ghostSprite: Sprite = null
let doorSprite: Sprite = null
let emptyTiles: tiles.Tile[] = []
let currentBrickAmount = 0
let bombExplosionCenter: Sprite = null
let playerSprite: Sprite = null
let bombTile: tiles.Tile = null
let bombSprite: Sprite = null
let bombExplosionDown: Image = null
let bombExplosionUp: Image = null
let bombExplosionRight: Image = null
let bombExplosionLeft: Image = null
let totalBrickAmount = 0
let explodeTimeSpan = 0
let enemySpeed = 0
enemySpeed = 40
explodeTimeSpan = 2000
totalBrickAmount = 50
bombExplosionLeft = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 
    . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 
    . 2 3 3 1 1 1 1 1 1 1 1 1 1 1 1 
    . 2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 
    . 2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 
    . 2 3 3 1 1 1 1 1 1 1 1 1 1 1 1 
    . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 
    . . 2 2 3 3 3 3 3 3 3 3 3 3 3 3 
    . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
bombExplosionRight = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
    3 3 3 3 3 3 3 3 3 3 3 3 2 2 . . 
    3 3 3 3 3 3 3 3 3 3 3 3 3 2 2 . 
    1 1 1 1 1 1 1 1 1 1 1 1 3 3 2 . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 3 2 . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 3 2 . 
    1 1 1 1 1 1 1 1 1 1 1 1 3 3 2 . 
    3 3 3 3 3 3 3 3 3 3 3 3 3 2 2 . 
    3 3 3 3 3 3 3 3 3 3 3 3 2 2 . . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
bombExplosionUp = img`
    . . . . . . . . . . . . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . 2 2 3 3 3 3 2 2 . . . . 
    . . . 2 2 3 3 3 3 3 3 2 2 . . . 
    . . . 2 3 3 3 1 1 3 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    `
bombExplosionDown = img`
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 3 3 1 1 1 1 3 3 2 . . . 
    . . . 2 2 3 3 1 1 3 3 2 2 . . . 
    . . . . 2 2 3 3 3 3 2 2 . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    `
setUpScene()
setUpPlayer()
createEnemy()
