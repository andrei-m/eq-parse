// an occurrence of damage from the logs
function Damage(time, damage, doer, taker) {
    this.time = time;
    this.damage = damage;
    this.doer = doer;
    this.taker = taker;
}

var directHit = {
    "regex": /^\[(.*)\] (.*) (?:hit|slash|bash|crush|pierce|kick|bite|maul|backstab|claw|strike)(?:s|es)? (.*) for (\d+) points of(?: non-melee)? damage.$/,
    "toDamage": function(split) {
        return new Damage(new Date(split[1]), parseInt(split[4]), split[2], split[3]);
    }
};

var indirect = {
    "regex": /^\[(.*)\] (.*) ha(?:ve|s) taken (\d+) damage from (?:your.*|.* by (.*)).*$/,
    "toDamage": function(split) {
        // a falsy split[4] means the character is the damager doer
        var doer = !split[4] ? "You" : split[4];
        return new Damage(new Date(split[1]), parseInt(split[3]), doer, split[2]);
    }
};

var exprs = [directHit, indirect];

// parse a raw line of log output
function parseLine(line) {
    for (var i=0; i < exprs.length; i++) {
        var split = exprs[i].regex.exec(line);

        if (split) {
            return exprs[i].toDamage(split);
        }
    }

    return null;
}

exports.parseLine = parseLine;
