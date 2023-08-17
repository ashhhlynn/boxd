class WatchlistFilm < ApplicationRecord
    belongs_to :user
    validates_uniqueness_of :watch_date, scope: :user_id
end
