class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :followers, :followees, :created_at
  has_many :diary_films
  has_many :watchlist_films
end
