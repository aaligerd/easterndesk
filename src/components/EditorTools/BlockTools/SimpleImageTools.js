export default class SimpleImage {
    static get isTune(){
        return true;
    }

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  constructor({ data }) {
    this.data = data || {};
    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('image-upload-tool');

    // File input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.marginBottom = '10px';
    fileInput.name = 'image';
    fileInput.addEventListener('change', this.uploadImage.bind(this));

    this.wrapper.appendChild(fileInput);

    if (this.data.url) {
      this._createImageBlock(this.data.url, this.data.alt || '', this.data.caption || '');
    }

    return this.wrapper;
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    // Replace this URL with your actual backend endpoint
    const uploadUrl = 'http://localhost:8008/api/v1/uploadFile';
    this._createImageBlock('https://res.cloudinary.com/dc4g2nhmq/image/upload/v1749196231/editorjs/f8q6pnqhreqcvjsndpgf.webp', '', '');
    // fetch(uploadUrl, {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(async (res) => {
    //   const result = await res.json();
    //   console.log(res.ok , result , result.url)
    //   if (res.ok && result && result.file.url) {
    //     this._createImageBlock(result.file.url, '', '');
    //   } else {
    //     console.error('Upload failed', result);
    //   }
    // })
    // .catch(err => {
    //   console.error('Error uploading image', err);
    // });
  }

  _createImageBlock(url, alt = '', caption = '') {
    this.wrapper.innerHTML = '';

    const image = document.createElement('img');
    image.src = url;
    image.style.maxWidth = '100%';
    image.alt = alt;

    const altInput = document.createElement('input');
    altInput.type = 'text';
    altInput.placeholder = 'Alt text (SEO)';
    altInput.value = alt;
    altInput.style.display = 'block';
    altInput.style.marginTop = '10px';

    const captionInput = document.createElement('input');
    captionInput.type = 'text';
    captionInput.placeholder = 'Image description';
    captionInput.value = caption;
    captionInput.style.display = 'block';
    captionInput.style.marginTop = '5px';

    this.wrapper.appendChild(image);
    this.wrapper.appendChild(altInput);
    this.wrapper.appendChild(captionInput);
  }

  save(blockContent) {
    const image = blockContent.querySelector('img');
    const altInput = blockContent.querySelectorAll('input')[0];
    const captionInput = blockContent.querySelectorAll('input')[1];

    return {
      url: image?.src || '',
      alt: altInput?.value || '',
      caption: captionInput?.value || ''
    };
  }

  validate(savedData) {
    return !!savedData.url.trim();
  }
}