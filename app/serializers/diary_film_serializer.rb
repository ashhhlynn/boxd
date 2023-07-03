class DiaryFilmSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :poster, :rating, :watch_date, :user_id, :user, :created_at
  belongs_to :user
end
