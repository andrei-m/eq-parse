// an occurrence of damage from the logs
function Damage(split) {
    this.time = new Date(split[1]);
    this.damage = parseInt(split[4]);
    this.doer = split[2];
    this.taker = split[3];
}

var regex = /^\[(.*)\] (.*) (?:hit|slash|bash|crush|pierce)(?:s|es)? (.*) for (\d+) points of(?: non-melee)? damage.$/;

// parse a raw line of log output
function parseLine(line) {
    var split = regex.exec(line);
    if (split) {
        return new Damage(split);
    } else {
        return null;
    }
}

exports.parseLine = parseLine;
