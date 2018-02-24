class Grade < ApplicationRecord
  validates_presence_of :grade_code, :student_id, :course_id
  validates :grade_code, acceptance: { accept: %w(A B C D E),
    message: 'should match (A B C D E)'}

  validates :course, uniqueness: { scope: [:course_id, :student_id],
    message: "should be unique by course and student" }

  belongs_to :student
  belongs_to :course


  def handle_csv(csv)
    errors = []
		csv.each do |row|
      begin
        student_id = row[:student_id].strip.to_i
        full_name = row[:full_name].strip
        if Student.find_by_full_name(full_name)
          raise StandardError, "#{full_name} already exists"
        end
        student = Student.create(full_name: full_name)
      rescue => e
        errors << e
      end
		end
    errors
  end

end
