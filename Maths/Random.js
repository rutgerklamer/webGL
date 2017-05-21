var seed = 15440;

function Rand() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x) * 1;
}
