# Качване на приложението ни в heroku

За да не мислим за всички сложни стъпки около сглабянето на адекватна
продукционна среда за приложението ни, можем да използваме услуга като heroku.

За да подготвим нашето приложение за пускане в heroku е нужно да подсигурим
няколко неща, които в това хранилище са направени като отделни подавания над
първото, в което е целия код на приложението.

### Port

Тъй като heroku е платформа, в който ресурсите се споделят между множество
приложения, порта на който ще работи вашето приложение не може да бъде статично
определен предварително. При стартиране на приложението в heroku, в обкръжението
му има променлива `$PORT`, която указва на кой порт трябва да слуша за
пристигащи заявки. Стига то да слуша на този порт, heroku се грижи пристигащите
заявки да стигат до него.

### Build процес

По подразбиране, когато идентифицира проекта като node приложение, heroku
 - ще изпълни `npm install`, за да инсталира нужните пакети
 - и след това `npm start`, за да стартира приложението

Ако това не е достатъчно за подготовка на средата за изпълнение на приложението,
останалите стъпки може да се дефинират в `build` команда в `scripts` секцията на
`package.json`.

В нашия случай ни е нужна отделна стъпка, която да създаде статичните файлове за
react приложението ни, като в папката `pokemon` изпълни `npm install`, за да
инсталира нужните пакети за него и след това `npm run build`, което да произведе
статичните файлове в  `pokemon/build` (symlink-ната в `static/`, от където се
сервират статични файлове от основното приложение в продуционна среда).
