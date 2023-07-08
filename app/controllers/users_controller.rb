class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def profile
    @user = current_user
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

  def followerz
    followers = current_user.followers
    render json: followers 
  end 

  def following 
    following = current_user.followees
    render json: following
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
