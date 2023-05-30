class CreateFilms < ActiveRecord::Migration[6.1]
  def change
    create_table :films do |t|
      t.string :title
      t.string :year
      t.string :director
      t.string :writer
      t.string :actors
      t.string :plot
      t.string :genre
      t.string :image_url

      t.timestamps
    end
  end
end
