class Registry<T extends Identifiable> {
    private map = {};
    constructor() {

    }

    public static register<T extends Identifiable>(registry: Registry<T>, item: T): T {
        registry.map[item.id.toString()] = item;

        return item;
    }

    public get(id: Identifier): T {
        return this.map[id.toString()];
    }

    public forEach(callback: (e: T) => void) {
        for (const id in this.map) {
            const t = this.map[id] as T;

            callback(t);
        }
    }
}