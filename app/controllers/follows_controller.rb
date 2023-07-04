class FollowsController < ApplicationController

  def index
    @follows = Follow.all
    @uf = @follows.where(following_id: session[:user_id])
    @user_follows = @uf.map do |f|
      f.user
    end 
    render json: @user_follows
  end

  def followers
    user_follows = current_user.follows
    @followers = user_follows.map do |f|
      User.find_by(id: f.following_id)
    end
    render json: @followers
  end

  def create
    follow = Follow.create(follow_params)
    if follow.valid?
      render json: follow.user, status: :created
    else
      render json: follow.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @follows = Follow.all
    follow = @follows.find do |f|
      f.user_id == params[:id] && f.following_id = session[:user_id]
    end 
    follow.destroy
  end

  private

  def follow_params
    params.require(:follow).permit(:user_id, :following_id)
  end
  
end
