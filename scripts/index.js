// Отслеживаемые элементы 

const buttonPopupProfileEdit = document.querySelector ('.profile__button-edit');
const popupFormProfile = document.querySelector ('.popup-form-profile');
const buttonPopupProfileClose = document.querySelector ('.popup-profile__close');
const popupAddCard = document.querySelector ('.popup-elements');
const buttonEditCard = document.querySelector ('.profile__button-add');
const buttonPopupCardClose = document.querySelector ('.popup-elements__close');
const profileName = document.querySelector ('.profile__user-name');
const profileDescription = document.querySelector ('.profile__description');
const imageContainer = document.querySelector ('.element-open-img__container');
const imageContainerItem = imageContainer.querySelector ('.element-open-img__img');
const openImage = document.querySelector ('.element-open-img');
const elementList = document.querySelector('.element-list');
const elementTemplate = document.querySelector('.element-template').content;
const popupItemPlace = popupAddCard.querySelector('.popup__item-place');
const popupItemPicture = popupAddCard.querySelector('.popup__item-picture');
const formAddCard = popupAddCard.querySelector('.popup__form__elements');  
const nameInput = popupFormProfile.querySelector ('.popup__item-name');
const descriptionInput = popupFormProfile.querySelector ('.popup__item-description');
const popupImageClose = document.querySelector ('.element-open-img__close');
const formAddProfile = document.querySelector ('.popup__form__profile');



// Функции попап (закрытие и открытие)

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Функция изменения профиля

buttonPopupProfileEdit.addEventListener('click', () => {
  openPopup(popupFormProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

// Присваивание вводимых данных новому имени и подзаголовка для профиля
function changeProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupFormProfile);
}

// Добавление карточки
function renderCardElement(element, container) {
  container.prepend(element);
};

function createCardElement(elementName, elementUrl) {
    const card = elementTemplate.cloneNode(true);
    //Отслеживание Лайка, Удаления, и Самой картинки
    const image = card.querySelector('.element-list__img');
    const deleteElement = card.querySelector ('.element-list__delete');
    const buttonLike = card.querySelector('.element-list__like');
    //Присваиваем ссылки и наименование карточек из массива для нашей заготовки под карточки
    image.src = elementUrl;  
    image.alt = elementName;
    card.querySelector('.element-list__title').textContent = elementName;
    // Удаление карточки
    deleteElement.addEventListener ('click', () => {
      const listItem = deleteElement.closest('.element-list__item');
    listItem.remove();
    });
    // Лайк на карточку
    buttonLike.addEventListener('click', () => {
      buttonLike.classList.toggle('element-list__like_active');
    });
   
    // функция открытия картинки
    image.addEventListener('click', () => {
      imageContainerItem.src = image.src; 
      imageContainerItem.alt = image.alt;
      imageContainer.querySelector('.element-open-img__title').textContent = image.alt;
      openPopup(openImage);
    });
    return card;
  };

// создание новой карточки
function addElementList(evt) {
  evt.preventDefault();
  elementList.prepend(createCardElement(popupItemPlace.value, popupItemPicture.value));
  closePopup (popupAddCard);
  formAddCard.reset();
};

//Открываем и закрываем попап вводимых данных для новой карточки

buttonEditCard.addEventListener('click', () => openPopup(popupAddCard));

buttonPopupCardClose.addEventListener('click', () => closePopup(popupAddCard));




//Вызываем и создаём карточки из массива
initialCards.forEach((item) => {
  const element = createCardElement(item.name, item.link);
  renderCardElement(element, elementList);
});

//Вызов функции создания карточки

formAddCard.addEventListener('submit', addElementList);


// Закрываем попап Картинки

popupImageClose.addEventListener('click', () => closePopup(openImage));

// Закрываем попап профиля

buttonPopupProfileClose.addEventListener('click', () => closePopup(popupFormProfile));

//Вызываем функцию изменения профиля

formAddProfile.addEventListener('submit', changeProfileInfo);




