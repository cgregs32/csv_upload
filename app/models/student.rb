class Student < ApplicationRecord
  validates_presence_of :full_name, :student_id

  has_many :grades
  has_many :courses, through: :grades


  def self.handle_csv(csv)
    errors = []
		csv.each do |row|
      begin
        student_id = row[:student_id].strip.to_i
        full_name = row[:full_name].strip
        if Student.find_by_full_name(full_name)
          raise StandardError, "Student: #{full_name} - already exists"
        end
        student = Student.create(full_name: full_name, student_id: student_id)
      rescue => e
        errors << e
      end
		end
    errors
  end

end
