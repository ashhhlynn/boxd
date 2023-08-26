class WatchlistFilmsController < ApplicationController

  def index
    watchlist_films = current_user.watchlist_films
    render json: watchlist_films
  end

  def create
    watchlist_film = WatchlistFilm.create(watchlist_film_params)
    if watchlist_film.valid?
      render json: watchlist_film, status: :created
    else
      render json: watchlist_film.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @watchlist_film = WatchlistFilm.find(params[:id])
    @watchlist_film.destroy
  end

  private

    def watchlist_film_params
      params.require(:watchlist_film).permit(:title, :year, :poster, :watch_date, :user_id)
    end
    
end
