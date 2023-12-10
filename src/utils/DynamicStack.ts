class Cell<T> {
    constructor(
        public item: T,
        public next: Cell<T> | null = null
    ) {}
}


class DynamicStack<T extends Cell<NonNullable<T>>> {
    constructor(
        public top: Cell<T> | null = null,
        public size: number = 0
    ) {}

    push(item: T): void {
        if(item == null) {
            throw new Error("item nulo");
        }
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

    isEmpty = (): boolean => this.top === null;

    getSize = (): number => this.size;

    peek = (): T | null => this.top ? this.top.item : null;

    getBottom = (): T | null => this.get(this.size - 1);
    
    get = (position: number): T => {
        if (position < 0 || position >= this.size)
            throw new Error("Posição inválida");
        let current: Cell<T> | null = this.top;
        for (let i = 0; i < position; i++) {
          if (current === null)
            throw new Error("A lista está inconsistente");
          current = current.next;
        }
        if (current === null)
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