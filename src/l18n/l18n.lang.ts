import { EN } from "./en.lang";
import { ES } from "./es.lang";


export default function getL18N(code: string): BaseLang {
    const defaultLang = EN;
    const langs = {EN: EN, ES: ES}
    return langs[code] || defaultLang;
}