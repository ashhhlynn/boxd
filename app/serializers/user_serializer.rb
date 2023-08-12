class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :followers, :followees
  has_many :diary_films
  has_many :watchlist_films
end
