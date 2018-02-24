class CreateGrades < ActiveRecord::Migration[5.1]
  def change
    create_table :grades do |t|
      t.string :grade_code, null: false
      t.belongs_to :student, foreign_key: 'student_id', null: false
      t.belongs_to :course, foreign_key: 'cours_id', null: false

      t.timestamps
    end
  end
end
