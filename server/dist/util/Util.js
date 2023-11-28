"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    static isLocal() {
        const env = process.env.NODE_ENV || 'production';
        return env === 'development';
    }
    static getServerUrl() {
        if (Util.isLocal()) {
            return `http://localhost:${process.env.PORT || 3000}`;
        }
    }
}
exports.Util = Util;
