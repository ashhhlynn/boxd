class FilmsController < ApplicationController

    def index
      @films = Film.all
      render json: @films
    end
  
    def create
      film = Film.create(film_params)
      if film.valid?
        render json: film, status: :created
      else
        render json: film.errors, status: :unprocessable_entity
      end
    end
  
    def show 
        @film = Film.find(params[:id])
        @diary_films = DiaryFilm.all 
        x = @diary_films.filter {|f| f.watch_date === @film.year}
        f = x.map {|x| x.rating}
        rate = ((f.reduce(0) { |sum, num | sum + num })/f.count.to_f).round(2)
        render json: rate
    end 
  
    private
  
      def film_params
        params.require(:film).permit(:year)
      end
  
  end
  