import React from 'react';

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <h1>Technologies used</h1>
        <ul>
          <li>HTML/CSS</li>
          <li>JavaScript</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>React.js</li>
          <li>Redux</li>
          <li>Redux-Sagas</li>
          <li>Material UI</li>
          <li>PostgreSQL</li>
          <li>Chart.js</li>
        </ul>
        <h1>Reflections</h1>
          <h2>Challenges</h2>
            <p>The most challenging part of this was</p>
          <h2>Next Steps</h2>
            <p>Next I hope to add image uploading, audio recording and playback, and shareability</p>
        <h1>Acknowledgements</h1>
          <ul>
            <li>Chris Black</li>
            <li>Prime Academy</li>
            <li>Mentors</li>
            <li>Everyone in Taaffeite</li>
          </ul>

      </div>
    </div>
  );
}

export default AboutPage;
