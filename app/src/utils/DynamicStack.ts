export class Cell<T> {
    constructor(
        public item: T,
        public next: Cell<T> | undefined = undefined
    ) {}
}

export class DynamicStack<T>{
    constructor(
        protected top: Cell<T> | undefined = undefined,
        protected size: number = 0
    ) {}

    public push(item: T): void {
        const newCell = new Cell<T>(item);
        newCell.next = this.top;
        this.top = newCell;
        this.size++;
    }

    public pop(): T {
        if (this.isEmpty())
          throw new Error("Empity stack");
        const aux: T = this.top!.item;
        this.top = this.top!.next;
        this.size--;
        return aux;
    }

    public isEmpty = (): boolean => this.top === undefined;

    public getSize = (): number => this.size;

    public peek = (): T => this.get(this.size - 1);

    public base = (): T => this.get(0);
    
    public get = (position: number): T => {
        if (position < 0 || position >= this.size)
            throw new Error("Invalid position");
        let current: Cell<T> | undefined = this.top;
        let i = this.size - 1;
        while (current && i > position) {
            current = current.next;
            i--;
        }
        if (!current)
            throw new Error("the list is in an inconsistent state");
        return current.item;
    };



    public static splitString(inputString: string): DynamicStack<string> {
        const stack = new DynamicStack<string>();
        for (let i = 0; i < inputString.length; i++) {
            stack.push(inputString[i]);
        }
        return stack;
    }

    
    public print(): void {
        if (this.isEmpty())
          console.log("Empity stack");
        console.log("Base\n")
        for (let i = this.size - 1; i >= 0; i--)
          console.log(this.get(i));
        console.log("\nTop");
    }
}
