# BodyBuddy
BodyBuddy is an AI-powered fitness web platform for people who want to exercise in their own homes or on the go, at their own pace. The platform offers an effective fitness experience without the need for a gym or personal trainer and without the worry of time and location constraints. The AI analysis checks your form in real-time, ensuring correct posture for a safe and effective workout. It also helps you create personalized workout plans based on your fitness level and goals. Plus, the progress dashboard keeps you motivated, making it easier to stay on track and maintain a regular workout routine, even when exercising alone!

## Technical Overview
BodyBuddy combines state-of-the-art tools to deliver a seamless fitness experience, and these are the reasons why they were chosen.

**React**—paired with **Vite**—was our choice for front-end development. React is the industry standard for building responsive and dynamic user interfaces, and Vite makes development faster with its lightning-fast build times. For styling, **Material UI** was a natural fit. Built for React, it allowed us to quickly develop a visually appealing and responsive interface.

For the AI poweredfeatures, we used **MediaPipe** library and **OpenAI API**. MediaPipe provides pre-trained models for posture detection and can be customized to meet our app’s needs. This enabled us to integrate real-time performance feedback using the webcam effectively. **OpenAI API** was used to generate personalized workout plans, since it delivers high-quality outputs based on templates and user settings.

On the back end, **Node.js** and **Express** power our server. We chose Node.js for its performance and scalability and Express for its simplicity and our familiarity with it. To manage our database interactions, we used the **Sequelize** library, which made data modeling and manipulation straightforward. For API security, we implemented **JWT**, ensuring secure user authentication and data integrity.

For our database, we initially opted for **Supabase**, a relational database, due to the consistency and availability benefits of this database type. However, given our 12-week timeline and limited time for high-quality database design, we found this decision challenging. In hindsight, a NoSQL database might have been more practical for faster implementation.

Together, these tools create a robust and efficient tech stack that brings our vision to life. Now, I’ll pass it over to our design lead to dive into the creative aspects of the app.
