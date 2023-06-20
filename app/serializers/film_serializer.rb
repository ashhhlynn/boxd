class FilmSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :director, :writer, :actors, :plot, :genre, :image_url, :created_at
end
