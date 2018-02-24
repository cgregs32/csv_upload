class Course < ApplicationRecord
  validates_presence_of :course_name, :course_id

  has_many :grades
  has_many :students, through: :grades

  def self.handle_csv(csv)
    errors = []
		csv.each do |row|
      begin
        course_name = row[:class_name].strip
        course_id = row[:class_id].strip.to_i
        if Course.find_by_course_name(course_name)
          raise StandardError, "Course: #{course_name} - already exists"
        end
        course = Course.create(course_name: course_name, course_id: course_id)
      rescue => e
        errors << e
      end
		end
    errors
  end
end
