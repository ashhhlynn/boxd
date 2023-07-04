Rails.application.routes.draw do
  resources :follows
  resources :users
  resources :diary_films
  resources :films
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#logout'
  get '/profile', to: 'users#profile'
  get '/followers', to: 'follows#followers'

end
