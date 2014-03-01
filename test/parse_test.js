var assert = require('assert'),
    parse = require('../parse');

(function nonMelee() {
    var dmg = parse.parseLine('[Tue Feb 25 20:06:12 2014] Branck hit a whiskered bat for 3935 points of non-melee damage.');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 20:06:12 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 3935, 'unexpected damage: ' + dmg.damage);
})();

(function melee() {
    var dmg = parse.parseLine('[Tue Feb 25 20:06:09 2014] You hit a whiskered bat for 258 points of damage.');
    assert(dmg, 'failed to parse line');
    assert.equal(dmg.time.getTime(), 
        new Date('Tue Feb 25 20:06:09 2014').getTime(), 
        'unexpected time: ' + dmg.time.getTime());
    assert.equal(dmg.damage, 258, 'unexpected damage: ' + dmg.damage);
})();

(function excluded() {
    assert.equal(parse.parseLine('[Tue Feb 25 20:05:46 2014] Targeted (Player): Palship'), null);
    assert.equal(parse.parseLine('You strike through your opponent\'s defenses!'), null);
    assert.equal(parse.parseLine('Branck`s warder scores a critical hit! (70)'), null);
})();
