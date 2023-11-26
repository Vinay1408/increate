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
            return 'http://localhost:3001';
        }
    }
}
exports.Util = Util;
