export abstract class View<T> {
    protected element: HTMLElement;
    private escape = false;

    constructor(selector: string, escape?: boolean) {
        const element = document.querySelector(selector);
        if(element) {
            this.element = element as HTMLAnchorElement;
        }
        if(escape) {
            this.escape = escape;
        }
    }

    protected abstract template(model: T): string;

}