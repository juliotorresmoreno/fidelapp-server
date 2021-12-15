
import * as fs from 'fs';
import handlebars from 'handlebars';
import * as path from 'path';
import getConfig from 'src/config/configuration';

export class Event {
    constructor(public readonly subject: string = '') { }
}

export class EmailEvent<T = any> extends Event {
    public readonly contentHTML: string;

    constructor(subject: string, template: string, payload?: T) {
        super(subject);

        const _content = fs.readFileSync(template).toString('utf-8');

        const _template = handlebars.compile(_content);
        this.contentHTML = _template(payload || {});
    }
}

type EmailEventSignUpArgs = {
    name: string;
    last_name: string;
    code: string;
}
export class EmailEventSignUp extends EmailEvent {
    public readonly subject: string;

    constructor(payload: EmailEventSignUpArgs) {
        const subject = 'EventSignUp';
        const templatePath = path.join(
            getConfig().basePath,
            'templates',
            'event-sign-up.hbs'
        );
        super(subject, templatePath, payload);
    }
}
