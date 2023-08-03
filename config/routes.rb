Rails.application.routes.draw do
  resources :follows
  resources :users
  resources :diary_films
  resources :films
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#logout'
  get '/profile', to: 'users#profile'
  post '/users/:id/follow', to: "users#follow"
  post '/users/:id/unfollow', to: "users#unfollow"
  get '/userfollowing', to: "users#userfollowing"
  get '/feed', to: "users#feed"
end
