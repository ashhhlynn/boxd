class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :created_at
  has_many :diary_films
end
