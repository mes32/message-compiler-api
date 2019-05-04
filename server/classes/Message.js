const moment = require('moment');
require('moment-timezone');

const TemplateVariableMapper = require('../modules/TemplateVariableMapper');

class Message {
    constructor(template, company, guest) {
        const currentTime = moment().tz(company.timezone);
        const variableMap = new TemplateVariableMapper(company, guest, currentTime);
        let message = this.evaluateVariables(template.message, variableMap);
        
        this.timestamp = currentTime.format();
        this.message = message;
    }

    evaluateVariables(template, variableMap) {
        let message = [];
        for (let i = 0; i < template.length; i++) {
            if (template[i] === '\\' && i + 1 < template.length && template[i + 1] === '$') {
                // This downgrades escaped variables
                // (e.g. \\${var} => ${var})
                message.push('$');
                i += 1;
            } else if (template[i] === '$' && i + 1 < template.length && template[i + 1] === '{') {
                // This evaluates variables
                // (e.g. ${var} => value)
                let varName = '';
                for (let j = i + 1; j < template.length; j++) {
                    if (template[j] === '}') {
                        varName = template.substring(i+2, j);
                        message.push(variableMap.lookup(varName));
                        i += varName.length + 2;
                        break;
                    }
                }
                if (!varName) {
                    throw new Error('Could not evaluate variable name in method evaluateVariables() of class Message.');
                }
            } else {
                message.push(template[i]);
            }
        }
        return message.join('');
    }
}

module.exports = Message;