class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.text :content
      t.boolean :completed

      t.timestamps
    end
  end
end
