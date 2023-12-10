class Cell<T> {
    constructor(
        public item: T,
        public next: Cell<T> | undefined = undefined
    ) {}
}

class DynamicStack<T> {
    constructor(
        public top: Cell<T> | undefined = undefined,
        public size: number = 0
    ) {}

    push(item: T): void {
        const newCell = new Cell(item);
        newCell.next = this.top;
        this.top = newCell;
        this.size++;
    }

    pop(): T {
        if (this.isEmpty())
          throw new Error("Erro: A pilha está vazia");
        const aux: T = this.top!.item;
        this.top = this.top!.next;
        this.size--;
        return aux;
    }

    isEmpty = (): boolean => this.top === undefined;

    getSize = (): number => this.size;

    peek = (): T | undefined => this.top?.item;

    getBottom = (): T | undefined => this.get(this.size - 1);
    
    get = (position: number): T => {
        if (position < 0 || position >= this.size)
            throw new Error("Posição inválida");

        let current: Cell<T> | undefined = this.top;
        let i = 0;

        while (current && i < position) {
            current = current.next;
            i++;
        }

        if (!current)
            throw new Error("A lista está inconsistente");

        return current.item;
    };

    print(): void {
        if (this.isEmpty())
          console.log("A pilha está vazia.");

        for (let i = this.size - 1; i >= 0; i--)
          console.log(this.get(i));
        
        console.log();
    }
}
