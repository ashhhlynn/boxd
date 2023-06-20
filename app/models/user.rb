class User < ApplicationRecord
    has_many :diary_films
    has_many :follows
    has_secure_password
    accepts_nested_attributes_for :diary_films
    accepts_nested_attributes_for :follows

end
