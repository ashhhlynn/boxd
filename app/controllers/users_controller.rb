class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def profile
    @user = current_user
    render json: @user, includes: [:follows, :diary_films]  
  end

  def show 
    @user = User.find(params[:id])
    render json: @user, includes: [:follows, :diary_films]  
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

  private

    def user_params
      params.permit(:username, :email, :password, :password_confirmation)
    end

end
