export class RandomPassword {
    constructor() {
        this.caracteres = '';
    }
    setLength(length) {
        this.length = length;
        return this;
    }
    setUpperCase(isUpperCase) {
        if (isUpperCase) {
            this.caracteres += 'ABCDEFGHIJKLMN[OPQRSTUVWXYZ';
        }
        return this;
    }
    setLowerCase(isLowerCase) {
        if (isLowerCase) {
            this.caracteres += 'abcdefghijklmnopqrstuvwxyz';
        }
        return this;
    }
    setNumberCase(isNumeric) {
        if (isNumeric) {
            this.caracteres += '0123456789';
        }
        return this;
    }
    setSymbol(isSymbolic) {
        if (isSymbolic) {
            this.caracteres += '!@$%^&*()<>,.?/[]{}-=_+';
        }
        return this;
    }
    generate() {
        let characterList = this.caracteres;
        if (characterList.length <= 0) {
            return '¡Quizás estés en busca de lo desconocido! Seguir mirando';
        }
        var password = '';
        for (let i = 0; i < this.length; ++i) {
            password += characterList[getRandomInt(0, characterList.length - 1)];
        }
        return password;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}