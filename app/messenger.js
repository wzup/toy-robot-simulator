'use strict';

module.exports = Messenger;

/**
 * The Messenger class, constructor
 * @param {object} config Messenger's config
 */
function Messenger(config) {
    this._config = config || {};
}

/**
 * Object.assign() polyfill. Is used when our Node.js engine doesn't implement
 * ECMAScript 2015 (ES6) Object.assign() method. For the sake of simplicity we
 * define it inline here. The code is taken from
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

var prototype = {

    /**
     * Instruction for a Messenger what message is needed
     * @param  {object} oData - {msg: 'aMessageKey', x: 10, y: 20, f: 'north', anyKey: 'someKey'}
     * @return {string} - parsed message
     * @public
     */
    getMessage: function(oData) {
        /**
         * If no any parameters provided.
         * Return a default welcome message.
         */
        if (!oData) {
            return this._config.oMsgs['welcome'];
        }
        /**
         * If there is no such a message-key in our oMsgs config.
         * Return a default welcome message.
         */
        if (!this._config.oMsgs[oData.msg]) {
            return this._config.oMsgs['welcome'];
        }
        return this._constructMessage(oData);
    },

    /**
     * Parses message string from oMsgs config by replacing {keys}
     * @param  {object} oData {msg: 'aMessageKey', x: 10, y: 20, f: 'north', anyKey: 'someKey'}
     * @return {string} - parsed message
     * @private
     */
    _constructMessage: function(oData) {
        var oCombined = Object.assign({}, oData, this._config.oSubs),
            str;

        str = this._config.oMsgs[oCombined.msg].replace(
            /{(\w+)}/g,
            function(match, p) {
                return oCombined[p];
            });
        return str;
    }
};

Messenger.prototype = Object.create(prototype);
Messenger.prototype.constructor = Messenger;
