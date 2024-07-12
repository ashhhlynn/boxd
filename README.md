# Boxd.
<table>
  <tr>
    <td>
A Letterboxd inspired social network for rating films from the OMDb database to a diary, adding to a watchlist, and tracking activity by followed users. Built with a React.js and Redux front end and Ruby on Rails with PostgreSQL database back end.    
    </td>
  </tr>
</table>

### :link: <a href="https://film-app.onrender.com/">Website</a> 
### :link: <a href="https://vimeo.com/922334242">Video</a>

### Technologies Used
- React.js
- Redux
- React Router
- Ruby on Rails
- PostgreSQL
- BCrypt Gem
- OMDb API
- Semantic UI React
- HTML & CSS
- Render

### Features
- Register and log in authenticated with BCrypt gem
- Search, sort, and display over 200,000 films through fetches from OMDb API database
- View film Boxd rating average and followed users who watched
- Log and rate films to diary on 5-star scale, and update or remove logs
- Add and remove films from watchlist
- Search for, follow and unfollow users to track activity on feed
- View film diaries of other users 

### Media 

#### Home (Search)
![Screenshot (181)](https://github.com/ashhhlynn/film_app/assets/84604278/3615b1c8-f1e4-4b23-952b-bf79d1c7fc44)

#### Home 
![Screenshot (182)](https://github.com/ashhhlynn/film_app/assets/84604278/eaaa741b-e4fe-4c8f-b733-e479429e28ec)

#### Film Modal
![Screenshot (184)](https://github.com/ashhhlynn/film_app/assets/84604278/46fda5a6-2817-40a9-a799-04a084eb54d1)

#### Diary
![Screenshot (187)](https://github.com/ashhhlynn/film_app/assets/84604278/8093a166-ec60-4259-b199-1a1fa69c5c6d)

#### Watchlist
![Screenshot (180)](https://github.com/ashhhlynn/film_app/assets/84604278/3dfb4b18-ddb9-438b-a7d0-d640e60c0b6f)

#### Follow Users
![Screenshot (186)](https://github.com/ashhhlynn/film_app/assets/84604278/349f37d5-56a2-4eb4-8e1a-277ac459bb68)

### Setup
#### Back End
   ```sh
   $ git clone https://github.com/ashhhlynn/film_app.git
   $ cd film_app
   $ bundle install
   $ rake db:create
   $ rake db:migrate
   $ rails s
   ```
#### Front End (New Terminal)
   ```sh
   $ cd client
   $ npm install
   $ npm start
   ```
### License 
This project is MIT licensed. 
