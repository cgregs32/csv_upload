class Grade < ApplicationRecord
  validates_presence_of :grade_code, :student_id, :course_id
  validates :grade_code, acceptance: {
    accept: %w(A B C D E),
    message: 'should match (A B C D E)'
  }

  validates :course, uniqueness: {
    scope: [:course_id, :student_id],
    message: "should be unique by course and student"
  }

  belongs_to :student, foreign_key: 'student_id'
  belongs_to :course, foreign_key: 'course_id'

  def self.with_user_and_course
    #join grades user and course data
  end

  def self.handle_csv(csv)
		messages = csv.map do |row|
      begin
        student_id = row[:student_id].to_i
        course_id = row[:class_id].to_i
        grade_code = row[:grade].strip
        student = Student.find_by_student_id(student_id)
        course = Course.find_by_course_id(course_id)
        if course.nil? && student.nil?
          raise StandardError,
          "No records found for Student: #{student_id} or Course: #{course_id}"
        elsif course.nil?
          raise StandardError, "Course - #{course_id}: no records found"
        elsif student.nil?
          raise StandardError, "Student - #{student_id}: no records found"
        end
        grade = Grade.create(
          student_id: student_id,
          course_id: course_id,
          grade_code: grade_code
        )
        if grade.errors.any?
          raise StandardError,
          "Grade exists for student #{student_id},
          #{grade.errors.messages[:course].join(',')}"
        end
        nil
      rescue => errors
        errors
      end
		end
  end

end
