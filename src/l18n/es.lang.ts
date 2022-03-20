
import { EN } from "./en.lang";

export const ES: BaseLang = {
    ...EN,
    sms: {
        accountValidation: (code) => `Su codigo de verificacion es ${code}`
    }
}
