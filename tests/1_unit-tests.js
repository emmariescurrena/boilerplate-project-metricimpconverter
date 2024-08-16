const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite("Function convertHandler.getNum()", () => {
        test('Read whole number', () => assert.equal(convertHandler.getNum("1L"), 1));
        test('Read decimal number', () => assert.equal(convertHandler.getNum("1.5L"), 1.5));
        test('Read fractional number', () => assert.equal(convertHandler.getNum("1/2L"), 0.5));
        test('Read fractional with decimal number', () => assert.equal(convertHandler.getNum("1.5/2L"), 0.75));
        test('Return error when reading double fractional number', () => {
            assert.equal(convertHandler.getNum("3/2/3L"), 'invalid number')
        });
        test('Default empty number to 0', () => assert.equal(convertHandler.getNum("L"), 1));
    });

    suite("Function convertHandler.getUnit()", () => {
        test('Read each unit', () => {
            const input = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
            const output = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
            input.forEach((unit, index) => {
                assert.equal(convertHandler.getUnit(unit), output[index]);
            });
        });
        test('Return error if invalid unit', () => {
            assert.equal(convertHandler.getUnit("45kj"), 'invalid unit');
        })
    });

    suite("Function convertHandler.getReturnUnit()", () => {
        test('Get return unit', () => {
            const input = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
            const output = ['L', 'gal', 'kg', 'lbs', 'km', 'mi'];
            input.forEach((unit, index) => {
                assert.equal(convertHandler.getReturnUnit(unit), output[index]);
            });
        });
    });

    suite("Function convertHandler.spellOutUnit()", () => {
        test('Get return unit', () => {
            const input = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
            const output = ['gallons', 'liters', 'pounds', 'kilograms', 'miles', 'kilometers'];
            input.forEach((unit, index) => {
                assert.equal(convertHandler.spellOutUnit(unit), output[index]);
            });
        });
    });

    suite("Function convertHandler.converted()", () => {
        test('Convert L to gal', () => assert.equal(convertHandler.convert(1, "L"), 0.26417));
        test('Convert gal to L', () => assert.equal(convertHandler.convert(1, "gal"), 3.78541));
        test('Convert mi to km', () => assert.equal(convertHandler.convert(1, "mi"), 1.60934));
        test('Convert km to mi', () => assert.equal(convertHandler.convert(1, "km"), 0.62137));
        test('Convert lbs to kg', () => assert.equal(convertHandler.convert(1, "lbs"), 0.45359));
        test('Convert kg to lbs', () => assert.equal(convertHandler.convert(1, "kg"), 2.20462));
    });
});