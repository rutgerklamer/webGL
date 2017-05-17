var keys = new Array();

function handleKeyUp(keycode) {
    keys[keycode.code] = false;
}

function handleKeyDown(keycode) {
    keys[keycode.code] = true;
}