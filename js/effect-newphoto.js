//модуль по добавлению эфектов для нового фото
const EFFECTS = [
  {
    name : 'none',
    style : 'none',
    min : 0 ,
    max : 100 ,
    step : 1,
    unit : '',
  },
  {
    name : 'chrome',
    style : 'grayscale',
    min : 0 ,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'sepia',
    style : 'sepia',
    min : 0,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'marvin',
    style : 'invert',
    min : 0,
    max : 100,
    step : 1,
    unit : '%',
  },
  {
    name : 'phobos',
    style : 'blur',
    min : 0,
    max : 3,
    step : 0.1,
    unit : 'px',
  },
  {
    name : 'heat',
    style : 'brightness',
    min : 1,
    max : 3,
    step : 0.1,
    unit : '',
  }
];

const START_EFFECT = EFFECTS[0];//задаём изначальное состояние картинке(выбранный эффект)
let chosenEffect = START_EFFECT;

const imgElement = document.querySelector('.img-upload__preview img');//элемент с фото
const effectElements = document.querySelector('.effects'); //радио-баттоны с эффектами
const sliderElement = document.querySelector('.effect-level__slider');//слайдер
const sliderContainerElement = document.querySelector('.img-upload__effect-level'); //сам слайдер
const effectLevelElement = document.querySelector('.effect-level__value');//значение слайдера

const renderSlider = () => sliderContainerElement.classList.remove('hidden');// отобразить слайдер
const hideSlider = () => sliderContainerElement.classList.add('hidden');// спрятать
const isStartValue = () => chosenEffect === START_EFFECT;// проверка на отстутствие эффектов

const updateSlider = () => {//присвоение значений полей слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
  if (isStartValue()){
    hideSlider();//если выбран 1 эффект значит скрыть слайдер
  } else {
    renderSlider(); //иначе показать
  }
};

const onEffectsChange = (evt) => {//смена эффекта
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  //
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);//поиск выбранного эффекта в перечислениях
  imgElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const initSlider = () => {//инициализация слайдера для эффектов
  noUiSlider.create(sliderElement, {
    range: {
      min: START_EFFECT.min,
      max: START_EFFECT.max,
    },
    start: START_EFFECT.max,
    step: START_EFFECT.step,
    connect: 'lower',
  });
};

const onSliderUpdate = () => {//обновление значений слайдера
  const sliderValue = sliderElement.noUiSlider.get();
  imgElement.style.filter = isStartValue()
    ? START_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;//присвоение значений
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {//сброс эффектов
  chosenEffect = START_EFFECT;
  updateSlider();
};

const setEffectsSlider = () => {//установка эффектов
  initSlider();
  hideSlider();
  effectElements.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);

};

const destroySlider = ()=>{//уничтожение слайдера
  sliderElement.noUiSlider.destroy();
  effectElements.removeEventListener('change', onEffectsChange);
};

export {resetEffects, setEffectsSlider,destroySlider};
