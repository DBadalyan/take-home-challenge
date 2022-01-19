import { getDownKeyCode, getEnterKeyCode, getEscKeyCode, getKeyKKeyCode, getUpKeyCode } from '../constants/keys.const';


export function isEnterKeyEvent(e) {
    return e && (e.which || e.keyCode) === getEnterKeyCode();
}

export function isEscKeyEvent(e) {
    return e && (e.which || e.keyCode) === getEscKeyCode();
}

/*
 * Ctrl || Command + K
 */
export function isOpenSearchKeyEvent(e) {
    return e && e.ctrlKey && (e.which || e.keyCode) === getKeyKKeyCode();
}

export function isUpKeyEvent(e) {
    return e && (e.which || e.keyCode) === getUpKeyCode();
}

export function isDownKeyEvent(e) {
    return e && (e.which || e.keyCode) === getDownKeyCode();
}
