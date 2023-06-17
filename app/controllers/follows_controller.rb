class FollowsController < ApplicationController

  def index
    @follows = Follow.all
    @followz = @follows.where(user_id: 1)
    render json: @followz
  end

  def show 
    @follow = Follow.find_by(params[:user_id])
    @user = User.find_by(@follow.follow_id)
  end 

  def create
    follow = Follow.create(follow_params)
    if follow.valid?
      render json: follow, status: :created
    else
      render json: follow.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
  end

  private

  def follow_params
    params.require(:follow).permit(:user_id, :following_id)
  end
end
