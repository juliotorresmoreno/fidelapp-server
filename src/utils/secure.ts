import { UnauthorizedException } from "@nestjs/common";
import { IncomingMessage } from "http";
import { RequestWithSession } from "src/types/http";
import { Roles } from "src/types/roles";

export function Authentication(...permit: Roles[]): MethodDecorator {
    return function (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const childFunction: Function = descriptor.value;

        descriptor.value = function value(...args: any[]) {
            const req: RequestWithSession = args
                .find(arg => arg instanceof IncomingMessage);

            if (!req || !req.session)
                throw new UnauthorizedException();
            if (permit.length > 0) {
                const exists = permit.find((rol) => req.session.rol === rol);
                if (!exists) throw new UnauthorizedException();
            }

            return childFunction.apply(this, args);
        };;
        return descriptor;
    }
}
