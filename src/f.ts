class FObject<K extends HTMLElement>
{
    private element: K;
    
    constructor(element:K)
    {
        this.element = element;
    }

    public newChild<K extends keyof HTMLElementTagNameMap>(tagName: K, classname:string|null|string[] = null): HTMLElementTagNameMap[K]
    {
        const elm = document.createElement(tagName);
        FObject.addFToElm(elm);

        if (classname != null)
        {
            if (typeof classname === "string")
            {
                classname.split(" ").forEach((e) => {elm.classList.add(e)});
            }
            else if (classname instanceof Array)
            {
                classname.forEach((e) => {elm.classList.add(e)});
            }
        }

        this.element.appendChild(elm);

        return elm;
    }

    public on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any)
    {
        this.element.addEventListener(type, listener);
    }

    public chain(): FChainBuilder<K>
    {
        return new FChainBuilder(this.element);
    }

    private static addFToElm(element:HTMLElement)
    {
        element.f = new FObject(element);
    }

    public static initialize()
    {
        FObject.addFToElm(document.body);
    }

    public static find(sel:string): HTMLElement
    {
        const elm = document.querySelector(sel) as HTMLElement;
        if (elm != null)
        {
            FObject.addFToElm(elm);
        }
        return elm;
    }

    public static findAll(sel:string): Array<HTMLElement>
    {
        const elms = document.querySelectorAll(sel);
        const arr = new Array<HTMLElement>();

        elms.forEach(e => {
            const elm = e as HTMLElement;
            if (elm != null)
            {
                FObject.addFToElm(elm);
                arr.push(elm);
            }
        });

        return arr;
    }
}

class FChainBuilder<T extends HTMLElement>
{
    private element:T;

    constructor(element:T)
    {
        this.element = element;
    }

    public set(content:string): FChainBuilder<T>
    {
        this.element.innerHTML = content;
        return this;
    }

    public class(classname:string): FChainBuilder<T>
    {
        this.element.classList.add(classname);
        return this;
    }

    public onClick(listener: (this: HTMLElement, ev: HTMLElementEventMap["click"]) => any): FChainBuilder<T>
    {
        this.element.f.on("click", listener);
        return this;
    }

    public newChild<K extends keyof HTMLElementTagNameMap>(tagName: K, classname:string|null|string[] = null): FChainBuilder<HTMLElementTagNameMap[K]>
    {
        return this.element.f.newChild(tagName, classname).f.chain();
    }

    public back(): FChainBuilder<T>
    {
        return this.element.parentElement.f.chain();
    }

    public end(): T
    {
        return this.element;
    }
}

interface HTMLElement
{
    f: FObject<typeof this>;
}

class f {
    constructor(sel:string) {
        return FObject.find(sel);
    }
    static all(sel:string) {
        return FObject.findAll(sel);
    }
}

(() => {
    FObject.initialize();
})();