export default class FontSizeTool {
    static get isInline() {
      return true;
    }
  
    constructor({ api }) {
      this.api = api;
      this.button = null;
      this.select = null;
      this.selectedSize = '16px'; // default
      this.tag = 'SPAN';
      this.class = 'cdx-fontsize';
    }
  
    render() {
      this.select = document.createElement('select');
      this.select.classList.add('cdx-inline-tool');
  
      const sizes = [
        { label: 'S', value: '12px' },
        { label: 'M', value: '16px' },
        { label: 'L', value: '20px' },
        { label: 'XL', value: '24px' },
      ];
  
      sizes.forEach(({ label, value }) => {
        const option = document.createElement('option');
        option.textContent = label;
        option.value = value;
        this.select.appendChild(option);
      });
  
      this.select.addEventListener('change', () => {
        this.selectedSize = this.select.value;
        this.api.inlineToolbar.close(); // Apply immediately
        this.surround();
      });
  
      return this.select;
    }
  
    surround() {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
      
        const range = selection.getRangeAt(0);
        if (range.collapsed) return;
      
        const selectedText = range.extractContents();
        const span = document.createElement(this.tag);
      
        span.classList.add(this.class);
        span.style.fontSize = this.selectedSize;
        span.appendChild(selectedText);
      
        range.insertNode(span);
        this.api.selection.expandToTag(span);
      }
      
  
    checkState() {
      const tag = this.api.selection.findParentTag(this.tag, this.class);
      this.select.classList.toggle(this.api.styles.inlineToolButtonActive, !!tag);
    }
  
    clear(range) {
      const tag = this.api.selection.findParentTag(this.tag, this.class);
      if (tag) {
        while (tag.firstChild) {
          tag.parentNode.insertBefore(tag.firstChild, tag);
        }
        tag.remove();
      }
    }
  }
  