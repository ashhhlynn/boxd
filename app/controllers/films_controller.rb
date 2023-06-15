class FilmsController < ApplicationController

      def index
        @films = Film.all
        render json: @films
      end
    
      def show
        render json: @film
      end
    
      def create
        @film= Film.create(film_params)
        
        if @film.save
          render json: @film, status: :created
        else
          render json: { errors: ["Recipe invalid."]  }
        end
      end
    

    
      def destroy
        @film.destroy
      end
    
      private
  
    
        def film_params
          params.require(:recipe).permit(:title, :year, :director, :writer, :actors, :plot, :genre, :image_url)
        end



end
