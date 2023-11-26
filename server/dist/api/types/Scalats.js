"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonScalar = exports.timestampScalar = exports.dateTimeScalar = void 0;
const nexus_1 = require("nexus");
exports.dateTimeScalar = (0, nexus_1.scalarType)({
    name: 'DateTime',
    asNexusMethod: 'date',
    serialize: (value) => value,
});
exports.timestampScalar = (0, nexus_1.scalarType)({
    name: 'Timestamp',
    asNexusMethod: 'timestamp',
    serialize: (value) => {
        const val = value;
        return val.getTime();
    },
});
exports.jsonScalar = (0, nexus_1.scalarType)({
    name: 'JSON',
    asNexusMethod: 'json',
    serialize: (value) => value,
});
