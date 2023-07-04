class User < ApplicationRecord
    has_many :diary_films
    has_many :follows
    has_secure_password
end
