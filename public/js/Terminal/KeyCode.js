// Key codes to be used in the Terminal
export const ENTER = 13;
export const UP_ARROW = 38;
export const DOWN_ARROW = 40;

// Gets the keycode entered based on different browsers
//
// @param: e used to read the event code
// @return: keycode for the key that was pressed
export const getKeyCode = e => {
    if(window.event) {
      return e.keyCode;
    } else if(e.which) {
      return e.which;
    }

    return 0;
}
