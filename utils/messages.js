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
  }
}

module.exports = { messages };
