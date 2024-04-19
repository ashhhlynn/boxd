class CreateWatchlistFilms < ActiveRecord::Migration[6.1]
  def change
    create_table :watchlist_films do |t|
      t.string :title
      t.string :year
      t.string :poster
      t.string :watch_date
      t.string :user_id

      t.timestamps
    end
  end
end