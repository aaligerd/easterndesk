export default class TextTransformTool {
    static get isInline() {
      return true;
    }
  
    static get sanitize() {
      return {
        span: {
          class: true,
        },
      };
    }
  
    constructor({ api }) {
      this.api = api;
      this.button = null;
      this.tag = 'SPAN';
      this.class = 'ce-inline-tool';
    }
  
    render() {
      this.button = document.createElement('button');
      this.button.type = 'button';
      this.button.innerHTML = 'Aa'; // You can use a better icon
      this.button.classList.add('ce-inline-tool');
      return this.button;
    }
  
    surround(range) {
      if (!range || range.collapsed) return;
  
      const selectedText = range.extractContents();
      const span = document.createElement(this.tag);
  
      // Determine transformation
      const currentText = selectedText.textContent;
      const isUpper = currentText === currentText.toUpperCase();
      span.textContent = isUpper ? currentText.toLowerCase() : currentText.toUpperCase();
  
      span.classList.add(this.class);
      range.insertNode(span);
  
      this.api.selection.expandToTag(span);
    }
  
    checkState(selection) {
      const anchorElement = this.api.selection.findParentTag(this.tag, this.class);
      this.button.classList.toggle(this.api.styles.inlineToolButtonActive, !!anchorElement);
    }
  
    clear(range) {
      const anchorElement = this.api.selection.findParentTag(this.tag, this.class);
      if (anchorElement) {
        while (anchorElement.firstChild) {
          anchorElement.parentNode.insertBefore(anchorElement.firstChild, anchorElement);
        }
        anchorElement.remove();
      }
    }
  }
  