class FollowsController < ApplicationController

  def index
    @followfilms = []
    @follows = Follow.all
    @followz = @follows.where(following_id: 2)
    @test = @followz.map do |f|
      f.user
    end 

    render json: @test
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
