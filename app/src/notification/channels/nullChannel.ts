import {Channel} from "./channel";

export class NullChannel extends Channel {
    process(): string {
        return '';
    }
}