const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const deckRouter = require('./routes/deck.router');
const languageRouter = require('./routes/language.router');
const detailsRouter = require('./routes/details.router');
const chaptersRouter = require('./routes/chapters.router');
const itemsRouter = require('./routes/items.router');
const lessonRouter = require('./routes/lesson.router');
const promptRouter = require('./routes/prompts.router');
const dataRouter = require('./routes/data.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/decks', deckRouter);
app.use('/deck', detailsRouter);
app.use('/api/languages', languageRouter);
app.use('/chapters', chaptersRouter);
app.use('/items', itemsRouter);
app.use('/study', lessonRouter);
app.use('/prompts', promptRouter);
app.use('/data', dataRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5051;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
