abstract class HtmlBacked
{
    private readonly tagName: keyof HTMLElementTagNameMap;
    private element: HTMLElement;
    private isDirty: boolean = true;

    constructor(tag: keyof HTMLElementTagNameMap)
    {
        this.tagName = tag;
    }

    public getHtml(): HTMLElement
    {
        return this.element;
    }

    protected markDirty()
    {
        this.isDirty = true;
    }

    protected generateBaseElement(): HTMLElement
    {
        return f.new(this.tagName);
    }

    public regenerateIfDirty(): boolean
    {
        if (this.isDirty)
        {
            this.generate();
            return true;
        }
        return false;
    }

    public generate()
    {
        if (this.element == null) {
            this.element = this.generateBaseElement();
        }
        else {
            this.element.f.removeAllChildren();
            // f.remove(this.element);
        }
        this.isDirty = false;
        return this.generateHtml(this.element);
    }

    protected abstract generateHtml(base: HTMLElement);
}