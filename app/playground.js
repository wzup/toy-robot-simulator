'use strict';

module.exports = Playgroud;

/**
 * The Playground class, constructor
 * @param {object} config playgroung's config
 * @constructor
 */
function Playgroud(config) {
    this._config = config;
}

var prototype = {
    /**
     * Check is X, Y are inside of the playground
     * @param  {INT}  x x-coordinate
     * @param  {INT}  y y-coordinate
     * @return {Boolean}
     */
    isOutOfPlayground: function(x, y) {
        if (
            (x > (this._config.startPointX + (this._config.lengthX - 1))) ||
            (x < this._config.startPointX) ||
            (y > (this._config.startPointY + (this._config.lengthY - 1))) ||
            (y < this._config.startPointY)
        ) {
            return true;
        } else
            return false;
    },
}

Playgroud.prototype = Object.create(prototype);
Playgroud.prototype.constructor = Playgroud;
