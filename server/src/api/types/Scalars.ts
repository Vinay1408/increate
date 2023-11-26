import { scalarType } from 'nexus';

export const dateTimeScalar = scalarType({
  name: 'DateTime',
  asNexusMethod: 'date',
  serialize: (value) => value,
});

export const timestampScalar = scalarType({
  name: 'Timestamp',
  asNexusMethod: 'timestamp',
  serialize: (value) => {
    const val = value as Date;
    return val.getTime();
  },
});

export const jsonScalar = scalarType({
  name: 'JSON',
  asNexusMethod: 'json',
  serialize: (value) => value,
});
