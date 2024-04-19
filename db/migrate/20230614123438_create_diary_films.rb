class CreateDiaryFilms < ActiveRecord::Migration[6.1]
  def change
    create_table :diary_films do |t|
      t.string :title
      t.string :year
      t.string :poster
      t.integer :rating
      t.string :watch_date
      t.string :user_id

      t.timestamps
    end
  end
end