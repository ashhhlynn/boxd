class FollowsController < ApplicationController

  def index
    @followfilms = []
    @follows = Follow.all
    @ff = @follows.where(following_id: session[:user_id])
    @user_follows = @ff.map do |f|
      f.user
    end 
    render json: @user_follows
  end

  def show 
    @follow = Follow.find_by(params[:user_id])
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
