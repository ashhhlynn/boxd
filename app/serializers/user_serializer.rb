class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :password_confirmation, :diary_films
has_many :follows
has_many :diary_films
end
