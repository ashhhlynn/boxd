class DiaryFilmSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :poster, :rating, :watch_date, :user_id
  belongs_to :user
end
