class Grade < ApplicationRecord
  validates_presence_of :grade_code, :student_id, :course_id
  validates :grade_code, acceptance: { accept: %w(A B C D E),
    message: 'should match (A B C D E)'}

  validates :course, uniqueness: { scope: [:course_id, :student_id],
    message: "should be unique by course and student" }

  belongs_to :student, :primary_key => 'student_id'
  belongs_to :course, :primary_key => 'course_id'


  #create grade entries only for students that exist
  # && only for courses that exist

  def self.handle_csv(csv)
    errors = []
		csv.each do |row|
      begin
        binding.pry
        student_id = row[:student_id].to_i
        course_id = row[:class_id].to_i
        grade_code = row[:grade].strip

        # full_name = row[:full_name].strip
        # if Student.find_by_full_name(full_name)
        #   raise StandardError, "#{full_name} already exists"
        # end
        # student = Student.create(full_name: full_name)
      rescue => e
        errors << e
      end
		end
    errors
  end

end
