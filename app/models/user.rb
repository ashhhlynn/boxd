class User < ApplicationRecord
    has_many :diary_films
    has_many :follows
    has_many :followers
    has_secure_password
end
