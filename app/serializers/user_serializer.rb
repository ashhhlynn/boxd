class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :diary_films, :follows
  has_many :follows
  has_many :diary_films
end
