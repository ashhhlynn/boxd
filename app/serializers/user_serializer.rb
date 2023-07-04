class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :follows
  has_many :diary_films
end
