class CreateGrades < ActiveRecord::Migration[5.1]
  def change
    create_table :grades do |t|
      t.string :grade_code
      t.belongs_to :student, foreign_key: true
      t.belongs_to :course, foreign_key: true

      t.timestamps
    end
  end
end
