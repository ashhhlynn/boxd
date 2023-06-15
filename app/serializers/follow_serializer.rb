class FollowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :following_id
  belongs_to :user
end
