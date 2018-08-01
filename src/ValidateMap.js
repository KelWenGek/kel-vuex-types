let validatorMap = {};

export default {
    set(validatorName, validator) {
        validatorMap[validatorName] = validator;
    },
    get(validatorName) {
        return validatorMap[validatorName];
    }
}