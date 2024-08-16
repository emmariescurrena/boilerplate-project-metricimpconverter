function ConvertHandler() {

    this.getNum = function (input) {
        let result;

        for (i = 0; i < input.length; i++) {
            if (input[i].toUpperCase() != input[i].toLowerCase()) {
                if (i == 0) {
                    result = "1";
                } else {
                    result = input.substring(0, i);
                }
                break;
            }
        };
        if (result.match(/^\d+(\.\d+)?\/\d+$/mg)) {
            const dividerIndex = result.indexOf("/");
            return result.substring(0, dividerIndex) / result.substring(dividerIndex + 1);
        } else if (result.match(/^\d+(\.\d+)?$/mg)) {
            return result;
        } else {
            return 'invalid number';
        }
    };

    this.getUnit = function (input) {
        let result;
        for (i = 0; i < input.length; i++) {
            if (input[i].toUpperCase() != input[i].toLowerCase()) {
                result = input.substring(i).toLowerCase();
                break;
            }
        };
        if (['gal', 'l', 'lbs', 'kg', 'mi', 'km'].includes(result)) {
            if (result == 'l') {
                return 'L';
            }
            return result;
        } else {
            return 'invalid unit';
        }
    };

    this.getReturnUnit = function (initUnit) {
        switch (initUnit) {
            case 'gal':
                return 'L';
            case 'L':
                return 'gal';
            case 'lbs':
                return 'kg';
            case 'kg':
                return 'lbs';
            case 'mi':
                return 'km';
            case 'km':
                return 'mi';
        }
    };

    this.spellOutUnit = function (unit) {
        switch (unit) {
            case 'gal':
                return 'gallons';
            case 'L':
                return 'liters';
            case 'lbs':
                return 'pounds';
            case 'kg':
                return 'kilograms';
            case 'mi':
                return 'miles';
            case 'km':
                return 'kilometers';
        }
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        let result;
        switch (initUnit) {
            case 'gal':
                result = initNum * galToL;
                break;
            case 'L':
                result = initNum / galToL;
                break;
            case 'lbs':
                result = initNum * lbsToKg;
                break;
            case 'kg':
                result = initNum / lbsToKg;
                break;
            case 'mi':
                result = initNum * miToKm;
                break;
            case 'km':
                result = initNum / miToKm;
                break;
        }
        return result.toFixed(5)
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        const initUnitString = this.spellOutUnit(initUnit)
        const returnUnitString = this.spellOutUnit(returnUnit)

        return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`
    };

}

module.exports = ConvertHandler;
