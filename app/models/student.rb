class Student < ApplicationRecord
  validates_presence_of :full_name

  has_many :grades
  has_many :courses, through: :grades


  def self.handle_csv(csv)
    begin
			csv.each do |row|
        student_id = row[:student_id].strip
        full_name = row[:full_name].strip
        next unless Student.find_by_id(student_id.to_i).nil?
        student = Student.create(full_name: full_name)
			end
		rescue => e
			#collect errors for report
		end
  end

  private
    def check_if_student_exists(id)

    end
end
