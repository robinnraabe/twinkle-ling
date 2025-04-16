# Twinkle Ling

<!-- Table of Contents -->
## Table of Contents
<ul dir="auto">
<li><a href="#description">Description</a></li>
<li><a href="#built-with">Built With</a></li>
<li><a href="#demo">Demonstration</a></li>
<li><a href="#usage">Usage</a></li>
</ul>

## Description
<!-- Description goes here -->
<p dir="auto">
Twinkle Ling is a language flashcard application that allows users to create, organize, and study flashcard decks. They can track their daily and weekly progress and choose between multiple study modes for each study session. See "How To Use" below for details on current functionality.

More functionality is on the way, so please check back soon!
Soon to be added: audio upload and replay, image upload, public deck and user search, user profile editing and visiting, and deck sharing.
</p>

## Built With
<!-- Built With -->
<p><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/> 
<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react" width="60" height="60"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="60" height="60"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" />
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="60" height="60"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="50" height="50"/>
<img src="https://inapp.com/wp-content/uploads/elementor/thumbs/express-js-01-1-q05uw85vt1jqloiy5k82sfy7tgvysgt1uqld8slsbc.png" alt="express" width="90" />
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Axios_logo_%282020%29.svg/150px-Axios_logo_%282020%29.svg.png" alt="axios" width="60"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="postgresql" width="60" height="60">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Passportjs.svg/240px-Passportjs.svg.png" alt="PassportJS" width="60" height="60"/>
<img src="https://v4.mui.com/static/logo.png" alt="Material UI" width="60" height="60" />
<img src="https://cdn.worldvectorlogo.com/logos/postman.svg" alt="postman" width="60" height="60"/>
</p>

## Demonstration
<video controls="controls" width="800" height="600" name="Twinkle Ling Demo">
  <source src="https://www.youtube.com/watch?v=oahboXw4BH4">
</video>

## Usage

### Dashboard
Users can log in and see their user dashboard, which shows their weekly progress, recently used flashcard decks, and trending decks. 
![Dashboard - Progress](./public/images/progress.png)
![Dashboard - Decks](./public/images/dashboard-decks.png)

### Decks
Users can view details of flashcard decks they use by clicking the chosen deck anywhere but the center 'Quick Study' banner. 
![View Deck](./public/images/deck-details.png)

On the details page, each chapter has a progress bar to show progress towards chapter completion, and each chapter can be expanded to show the words it contains. A deck requires a minimum of 1 chapter, but a chapter can contain any number of words.
![View Items](./public/images/deck-view-items.png)

Users can only edit flashcard decks they own. Inaccesible options are grayed out for the user, and uneditable items are shown in view-mode only.
![Edit Deck](./public/images/deck-settings.png)
![Edit Items](./public/images/deck-edit-items.png)

### Study
Users can edit their study settings to choose prompt options, answer options, and number of words per session.
![Settings](./public/images/edit-settings.png)  

Users can enter a study session by:
<ul>
  <li>Clicking "Quick Study" on the chosen deck on their dashboard or deck list, which defaults to a review session of all words in that deck, or a learning session if no words have been learned by the user.</li>

  ![Quick Study](./public/images/quick-study.png)

  <li>Clicking "learn" or "review" from the deck's details page, which begins a session with only new words, or a session with only previously learned words, respectively. Each option can be chosen only if it is available for the deck.</li>

  ![Deck - Learn & Review](./public/images/review-deck.png)

  <li>Clicking "learn" or "review" from an individual chapter from a deck's details page to only learn or review the words in the selected chapter. Each option can be chosen only if it is available for the chapter.</li>

  ![Chapter - Learn & Review](./public/images/learn-chapter.png)
</ul> 

During a study session, each word will be presented in the user's chosen prompt type, and 6 randomized answer options (chosen from the same deck) are presented beneath it. There is a counter on the top right to record how many correct guesses and mistakes the user makes. There is a progress bar at the top to show the user how far they are in the session, and it automatically updates when they make a correct guess. Sessions do not end until every prompt is answered correctly.
![Session](./public/images/study-session.png) ![Session Alt](./public/images/study-session-2.png)

If a study session is ended prematurely, all session progress is saved but no session summary is shown, and the user is redirected to details page for that deck.

When a session is finished, the user can view their session summary and edit their study settings before the next session.
![Session End](./public/images/session-end.png)

### Sharing
Deck sharing feature coming soon.
