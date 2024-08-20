class FObject
{
    private element: HTMLElement;
    
    constructor(element:HTMLElement)
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

    public chain(): FChainBuilder
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
}

class FChainBuilder
{
    private element:HTMLElement;

    constructor(element:HTMLElement)
    {
        this.element = element;
    }

    public set(content:string): FChainBuilder
    {
        this.element.innerHTML = content;
        return this;
    }

    public class(classname:string): FChainBuilder
    {
        this.element.classList.add(classname);
        return this;
    }

    public onClick(listener: (this: HTMLElement, ev: HTMLElementEventMap["click"]) => any)
    {
        this.element.f.on("click", listener);
    }

    public newChild<K extends keyof HTMLElementTagNameMap>(tagName: K, classname:string|null|string[] = null): FChainBuilder
    {
        return this.element.f.newChild(tagName, classname).f.chain();
    }
}

interface HTMLElement
{
    f: FObject;
}

(() => {
    FObject.initialize();
    // (HTMLElement.prototype as any).f = () => {};

    document.body.f.newChild("p", "test").f.newChild("img");
})();