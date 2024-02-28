class UsersController < ApplicationController

    def index
        @users = User.all
        filtered = @users.filter { |u| !current_user.followed_users.find_by(followee_id: u.id) }
        render json: filtered
    end

    def create
        user = User.create(user_params)
        if user.save
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: { errors: ["Signup invalid"] }
        end 
    end

    def profile
        @user = current_user
        render json: @user, includes: :diary_films
    end

    def show
        @user = User.find(params[:id])
        render json: @user, includes: :diary_films
    end

    def follow
        @user = User.find(params[:id])
        current_user.followees << @user
    end
  
    def unfollow
        @user = User.find(params[:id])
        current_user.followed_users.find_by(followee_id: @user.id).destroy
    end

    def userfollowing 
        @following = current_user.followees
        render json: @following
    end 

    def feed
        films = current_user.followees.map { |f| f.diary_films }
        sorted = films.flatten.sort { |a, b| b.created_at <=> a.created_at } 
        @feed = sorted
        render json: @feed
    end 

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end

end