class WatchlistFilmSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :poster, :watch_date, :user_id
  belongs_to :user
end
