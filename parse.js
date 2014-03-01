// an occurrence of damage from the logs
function Damage(time, damage) {
    this.time = time;
    this.damage = damage;
}

var regex = /^\[(.*)\].*?(\d+) points of(?: non-melee)? damage.$/;

// parse a raw line of log output
function parseLine(line) {
    var split = regex.exec(line);
    if (split) {
        return new Damage(new Date(split[1]), split[2]);
    } else {
        return null;
    }
}

exports.parseLine = parseLine;
