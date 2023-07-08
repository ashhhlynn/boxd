Rails.application.routes.draw do
  resources :followers
  resources :follows
  resources :users
  resources :diary_films
  resources :films
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#logout'
  get '/profile', to: 'users#profile'
  post '/users/:id/follow', to: "users#follow"
  post '/users/:id/unfollow', to: "users#unfollow"
  get '/followerz', to: "users#followerz"
  get '/following', to: "users#following"

end
