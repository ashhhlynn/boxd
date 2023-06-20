class FollowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :following_id, :user
  belongs_to :user
end
