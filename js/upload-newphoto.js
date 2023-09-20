const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const previewBigImg = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const previewEffects = form.querySelectorAll('.effects__preview');

const setPreviewPictureLoader = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewBigImg.src = URL.createObjectURL(file);
      previewEffects.forEach((preview) =>{
        preview.style.backgroundImage = `url(${previewBigImg.src})`;
      });
    }

  });
};

export {setPreviewPictureLoader};
