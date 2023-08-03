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
        render json: @film
    end 
  
    private
  
      def film_params
        params.require(:film).permit(:year)
      end
  
  end
  