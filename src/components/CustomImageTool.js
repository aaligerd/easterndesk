export default class CustomImageTool {
    static get toolbox() {
        return {
            title: 'Image',
            icon: `<svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z" stroke="#000000" stroke-width="2"/>
<path d="M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 20L6.87381 16.4077C7.51098 15.6113 8.65134 15.4342 9.5 16C10.3487 16.5658 11.489 16.3887 12.1262 15.5922L13.7254 13.5933C14.4252 12.7185 15.7069 12.5891 16.5675 13.3062L21 17" stroke="#000000" stroke-width="2"/>
</svg>`
        };
    }

    /**
     * Constructor to load previously saved data
     */

    constructor({ data }) {
        console.log("Data-> ",data)
        this.data = data || {};
        this.imageUrl = this.data.url || null;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.style.width = '100%';
        wrapper.style.border = '2px dashed #ccc';
        wrapper.style.borderRadius = '8px';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.cursor = 'pointer';
        wrapper.style.backgroundColor = '#f9f9f9';

        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.accept = 'image/*';
        this.input.style.display = 'none';

        const handleClick = () => {
            this.input.click();
        };

        // Add click listener
        wrapper.addEventListener('click', handleClick, true);

        // Case 1: Previously uploaded image exists
        if (this.imageUrl) {
            wrapper.removeEventListener('click', handleClick, true);
            this.renderImageAndInputs(wrapper, this.imageUrl, this.data);
        } else {
            wrapper.style.height = '200px';
            wrapper.innerText = 'Click to upload image';
        }

        // File input handler
        this.input.addEventListener('change', async () => {
            const file = this.input.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                wrapper.innerText = 'Uploading...';

                try {
                    const uploadUrl = `${process.env.REACT_APP_BASE_URL}/uploadFile`;
                    const response = await fetch(uploadUrl, {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (response.ok && result.file.url) {
                        wrapper.removeEventListener('click', handleClick, true);
                        this.imageUrl = result.file.url;
                        this.lowIageUrl = result.file.lowResUrl;
                        wrapper.innerHTML = '';
                        this.renderImageAndInputs(wrapper, result.file.url);
                    } else {
                        wrapper.innerText = 'Upload failed';
                    }
                } catch (err) {
                    console.error(err);
                    wrapper.innerText = 'Upload error';
                }
            }
        });

        wrapper.appendChild(this.input);
        this.wrapper = wrapper;
        return wrapper;
    }

    /**
     * Render uploaded image and caption inputs
     */
    renderImageAndInputs(wrapper, imageUrl, data = {}) {
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        imgContainer.style.width = '100%';
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        wrapper.style.height = 'auto';
        wrapper.style.border = 'none';
        wrapper.style.borderRadius = '0px';

        imgContainer.appendChild(img);
        wrapper.appendChild(imgContainer);

        const captionContainer = document.createElement('div');
        captionContainer.style.marginTop = '10px';
        captionContainer.style.marginBottom = '10px';
        captionContainer.style.width = '90%';
        captionContainer.style.display = 'flex';
        captionContainer.style.flexDirection = 'column';
        captionContainer.style.alignItems = 'stretch';
        captionContainer.style.gap = '6px';

        const titleLabel = document.createElement('label');
        titleLabel.innerText = 'Title:';
        titleLabel.style.fontSize = '14px';
        titleLabel.style.fontWeight = 'bold';

        const captionLabel = document.createElement('label');
        captionLabel.innerText = 'Caption:';
        captionLabel.style.fontSize = '14px';
        captionLabel.style.fontWeight = 'bold';
        const sourceLabel = document.createElement('label');
        sourceLabel.innerText = 'Source:';
        sourceLabel.style.fontSize = '14px';
        sourceLabel.style.fontWeight = 'bold';

        this.titleInput = document.createElement('input');
        this.titleInput.type = 'text';
        this.titleInput.style.width = '100%';
        this.titleInput.style.padding = '6px';
        this.titleInput.style.fontSize = '14px';
        this.titleInput.value = data.title || '';

        this.captionInput = document.createElement('textarea');
        this.captionInput.rows = 2;
        this.captionInput.style.width = '100%';
        this.captionInput.style.padding = '6px';
        this.captionInput.style.fontSize = '14px';
        this.captionInput.value = data.caption || '';

        this.sourceInput = document.createElement('input');
        this.sourceInput.type = 'text';
        this.sourceInput.style.width = '100%';
        this.sourceInput.style.padding = '6px';
        this.sourceInput.style.fontSize = '14px';
        this.sourceInput.value = data.source || '';

        captionContainer.appendChild(titleLabel);
        captionContainer.appendChild(this.titleInput);
        captionContainer.appendChild(captionLabel);
        captionContainer.appendChild(this.captionInput);
        captionContainer.appendChild(sourceLabel);
        captionContainer.appendChild(this.sourceInput);
        captionContainer.style.display = 'none'; // Initially hidden
        imgContainer.addEventListener('click', () => {
            captionContainer.style.display = captionContainer.style.display === 'none' ? 'block' : 'none';
        }, true);
        wrapper.appendChild(captionContainer);
    }

    save() {
        return {
            url: this.imageUrl || null,
            lowImageUrl:this.lowIageUrl||null,
            title: this.titleInput?.value || '',
            caption: this.captionInput?.value || '',
            source: this.sourceInput?.value || ''
        };
    }
}
