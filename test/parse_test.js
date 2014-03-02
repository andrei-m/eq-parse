var assert = require('assert'),
    parse = require('../parse');

(function nonMelee() {
    var dmg = parse.parseLine('[Tue Feb 25 20:06:12 2014] Branck hit a whiskered bat for 3935 points of non-melee damage.');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 20:06:12 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 3935, 'unexpected damage: ' + dmg.damage);
    assert.equal(dmg.doer, 'Branck', 'unexpected doer: ' + dmg.doer);
    assert.equal(dmg.taker, 'a whiskered bat', 'unexpected taker: ' + dmg.taker);
})();

(function hit() {
    var dmg = parse.parseLine('[Tue Feb 25 20:06:09 2014] You hit a whiskered bat for 258 points of damage.');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 20:06:09 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 258, 'unexpected damage: ' + dmg.damage);
    assert.equal(dmg.doer, 'You', 'unexpected doer: ' + dmg.doer);
    assert.equal(dmg.taker, 'a whiskered bat', 'unexpected taker: ' + dmg.taker);
})();

(function slash() {
    var dmg = parse.parseLine('[Tue Feb 25 20:15:59 2014] Branck`s pet slashes The Blight Wisp for 459 points of damage.');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 20:15:59 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 459, 'unexpected damage: ' + dmg.damage);
    assert.equal(dmg.doer, 'Branck`s pet', 'unexpected doer: ' + dmg.doer);
    assert.equal(dmg.taker, 'The Blight Wisp', 'unexpected taker: ' + dmg.taker);
})();

(function excluded() {
    assert.equal(parse.parseLine('[Tue Feb 25 20:05:46 2014] Targeted (Player): Palship'), null);
    assert.equal(parse.parseLine('You strike through your opponent\'s defenses!'), null);
    assert.equal(parse.parseLine('Branck`s warder scores a critical hit! (70)'), null);
})();

(function dotDone() {
    var dmg = parse.parseLine('[Tue Feb 25 21:05:58 2014] Master Putremancer Fellid has taken 900 damage from your Bite of the Asp.');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 21:05:58 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 900, 'unexpected damage: ' + dmg.damage);
    assert.equal(dmg.doer, 'You', 'unexpected doer: ' + dmg.doer);
    assert.equal(dmg.taker, 'Master Putremancer Fellid', 'unexpected taker: ' + dmg.taker);
})();

(function dotTaken() {
    var dmg = parse.parseLine('[Tue Feb 25 21:06:05 2014] You have taken 213 damage from Withering Destruction by Master Putremancer Fellid\'s corpse');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 21:06:05 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 213, 'unexpected damage: ' + dmg.damage);
    assert.equal(dmg.doer, 'Master Putremancer Fellid\'s corpse', 'unexpected doer: ' + dmg.doer);
    assert.equal(dmg.taker, 'You', 'unexpected taker: ' + dmg.taker);
})();

console.log('ok');
