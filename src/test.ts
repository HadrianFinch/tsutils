class foo extends HtmlBacked
{
    protected generateHtml(base: HTMLElement) {
        // throw new Error("Method not implemented.");
    }
    constructor()
    {
        super("div");
    }
}

const bar = new foo();
bar.generate();
bar.getHtml();

document.body.f.chain().newChild("h1").set("Title Here").newSibling("p").set("content goes underneath").end();