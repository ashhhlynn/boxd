class DiaryFilmsController < ApplicationController

    def index
        @diary_films = DiaryFilm.all.order(created_at: :desc)
        render json: @diary_films
    end

    def create
        diary_film = DiaryFilm.create(diary_film_params)
        if diary_film.valid?
            render json: diary_film, status: :created
        else
            render json: diary_film.errors, status: :unprocessable_entity
        end
    end

    def show 
        diary_film = DiaryFilm.find(params[:id])
        @diary_films = DiaryFilm.all
        ratings = @diary_films.select{|u| u.watch_date === diary_film.watch_date}.map{|y| y.rating}
        rate = ((ratings.reduce(:+))/ratings.count.to_f).round(2)
        render json: rate
    end 

    def update
        @diary_film = DiaryFilm.find(params[:id])
        if @diary_film.update(diary_film_params)
            render json: @diary_film
        else
            render json: @diary_film.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @diary_film = DiaryFilm.find(params[:id])
        @diary_film.destroy
    end

    private

    def diary_film_params
        params.require(:diary_film).permit(:title, :year, :poster, :rating, :watch_date, :user_id)
    end

end