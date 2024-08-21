class Identifier {
    public readonly namespace: string;
    public readonly id: string;

    public static equal(a: Identifier, b: Identifier) {
        return (a.id === b.id) && (a.namespace === b.namespace);
    }

    constructor(namespace: string, id: string) {
        this.namespace = namespace;
        this.id = id;
    }

    public toString(): string {
        return this.namespace + ":" + this.id;
    }

    public static parse(str: string): Identifier {
        return new Identifier(str.split(":")[0], str.split(":")[1]);
    }
}

class Identifiable {
    public readonly id: Identifier;

    constructor(id: Identifier) {
        this.id = id;
    }
}