import assert from 'assert';
import { Encoder } from './encoder';

let expected1 = Encoder.encode('XXXYYYYZZQXX');
assert(
    expected1 === 'X3Y4Z2Q1X2',
    'Encoded sequence XXXYYYYZZQXX needs to be X3Y4Z2Q1X2'
);

let expected2 = Encoder.encode('X');
assert(expected2 === 'X1', 'Encoded sequence X needs to be X1');

let expected3 = Encoder.encode('MMM');
assert(expected3 === 'M3', 'Encoded sequence MMM needs to be M3');

let expected4 = Encoder.encode('M1M2');
assert(
    expected4 === null,
    'Encoded sequence needs to be consisted of only alphabetic characters'
);
