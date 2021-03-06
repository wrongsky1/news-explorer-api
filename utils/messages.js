const messages = {
  auth: {
    authIsSuccess: 'Авторизация прошла успешно',
    notAuthorised: 'Необходима авторизация',
    wrongEmailOrPassword: 'Неправильная почта или пароль',
    logout: 'Вы успешно вышли из учетной записи',
  },
  article: {
    isNotValid: 'Ошибка валидации данных статьи',
    isDeleted: 'Статья удалена',
    idIsNotFound: 'Нет статьи с таким id',
    idIsNotValid: 'Данный id статьи невалиден',
    isCreated: 'Статья успешно добавлена',
  },
  user: {
    passwordIsNotValid: 'Длинна пароля менее 8 символов, либо пароль не валиден',
    idIsNotFound: 'Нет пользователя с таким id',
    passwordTooShort: 'Длинна пароля должна быть не менее 8 символов',
    emailAlreadyRegistered: 'Пользователь с таким email уже зарегистрирован',
  },
  validation: {
    urlIsNotValid: 'Невалидный URL',
    notFound: 'Запрашиваемый ресурс не найден',
  },
  limiter: {
    manyRequests: 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже',
  },
  schemas: {
    isEmpty: 'Поле не может быть пустым',
    wrongUrl: 'Неправильный формат ссылки',
    emailIsNotValid: 'Невалидный email',
    isRequired: 'Поле обязательно для заполнения',
  },
};

module.exports = { messages };
