// Key codes to be used in the Terminal
export const KEY_ERROR = 0;

export const BACK_SPACE = 8;
export const TAB = 9;
export const ENTER = 13;
export const SHIFT = 16;
export const CTRL = 17;
export const ALT = 18;

export const CAPS_LOCK = 20;

export const ESCAPE = 27;

export const SPACE_BAR = 32;
export const PAGE_UP = 33;
export const PAGE_DOWN = 34;
export const END = 35;
export const HOME = 36;
export const ARROW_LEFT = 37;
export const ARROW_UP = 38;
export const ARROW_RIGHT = 39
export const DOWN_ARROW = 40;

export const INSERT = 45;
export const DELETE = 46;

export const ZERO = 48;
export const ONE = 49;
export const TWO = 50;
export const THREE = 51;
export const FOUR = 52;
export const FIVE = 53;
export const SIX = 54;
export const SEVEN = 55;
export const EIGHT = 56;
export const NINE = 57;

export const KEY_COLON = 59;

export const KEY_EQUALS = 61;

export const KEY_A = 65;
export const KEY_B = 66;
export const KEY_C = 67;
export const KEY_D = 68;
export const KEY_E = 69;
export const KEY_F = 70;
export const KEY_G = 71;
export const KEY_H = 72;
export const KEY_I = 73;
export const KEY_J = 74;
export const KEY_K = 75;
export const KEY_L = 76;
export const KEY_M = 77;
export const KEY_N = 78;
export const KEY_O = 79;
export const KEY_P = 80;
export const KEY_Q = 81;
export const KEY_R = 82;
export const KEY_S = 83;
export const KEY_T = 84;
export const KEY_U = 85;
export const KEY_V = 86;
export const KEY_W = 87;
export const KEY_X = 88;
export const KEY_Y = 89;
export const KEY_Z = 90;

export const NUM_ZERO = 96;
export const NUM_ONE = 97;
export const NUM_TWO = 98;
export const NUM_THREE = 99;
export const NUM_FOUR = 100;
export const NUM_FIVE = 101;
export const NUM_SIX = 102;
export const NUM_SEVEN = 103;
export const NUM_EIGHT = 104;
export const NUM_NINE = 105;
export const NUM_TIMES = 106;
export const NUM_PLUS = 107;
export const NUM_MINUS = 109;
export const NUM_DEVIDE = 111;
export const NUM_PERIOD = 190;

export const KEY_F1 = 112;
export const KEY_F2 = 113;
export const KEY_F3 = 114;
export const KEY_F4 = 115;
export const KEY_F5 = 116;
export const KEY_F6 = 117;
export const KEY_F7 = 118;
export const KEY_F8 = 119;
export const KEY_F9 = 120;
export const KEY_F10 = 121;
export const KEY_F11 = 122;
export const KEY_F12 = 123;

export const NUM_LOCK = 144;

export const KEY_DASH = 173;
export const SYMOBL_COMMA = 188;
export const KEY_PERIOD = 190;
export const KEY_FORWARD_SLASH = 191;
export const KEY_TICK = 192;

export const KEY_OPEN_BRACKET = 219;
export const KEY_BACK_SLASH = 220;
export const KEY_CLOSE_BRACKET = 221;
export const KEY_PARENTHESES = 222;

const keyPress = Array();

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

    return KEY_ERROR;
}

export const getKeyPressed = code => String.fromCharCode(code);

export const reportKeyDown = code => keyPress[code] = true;
export const reportKeyUp = code => keyPress[code] = false;

const isKeyPressed = code => {
    let key = keyPress[code];

    if(key === undefined) {
        keyPress[code] = false;
        return false;
    }

    return key;
}
