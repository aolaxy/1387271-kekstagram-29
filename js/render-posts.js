//модуль по созданию галлереи фото
import{renderBigPhoto,openModal} from './big-photo.js';
//доступ к контейнеру куда вставлять список фото
const picContainer = document.querySelector('.pictures');
//доступ к шаблону мини-фотографий
const picTemplate = document.querySelector('#picture').content.querySelector('.picture');
//функция по созданию списка фотографий
const renderPosts = (pictures) =>{
  //создаем фрагмент
  const listFragment = document.createDocumentFragment();
  pictures.forEach((item) =>{
    //клонируем новое фото с использованием шаблона
    const picElement = picTemplate.cloneNode(true);
    //заполняем фото данными из массива
    picElement.querySelector('.picture__img').src = item.url;
    picElement.querySelector('.picture__img').alt = item.description;
    picElement.querySelector('.picture__likes').textContent = item.likes;
    picElement.querySelector('.picture__comments').textContent = item.comments.length;

    picElement.addEventListener('click', (evt) => {
      openModal(picElement);
      evt.preventDefault();
      renderBigPhoto(item);
    });
    listFragment.appendChild(picElement);
  });
  // добавляем в dom список из фрагмента
  picContainer.appendChild(listFragment);
};
export {renderPosts};
