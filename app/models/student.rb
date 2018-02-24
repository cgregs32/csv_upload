class Student < ApplicationRecord
  validates_presence_of :full_name

  has_many :grades
  has_many :courses, through: :grades


  def self.handle_csv(csv)
    errors = []
			csv.each do |row|
        begin
          student_id = row[:student_id].strip.to_i
          full_name = row[:full_name].strip
          raise StandardError, "#{full_name} with id #{student_id} already exists" unless Student.find_by_full_name(full_name).nil?
          student = Student.create(full_name: full_name)
        rescue => e
          errors << e
        end
			end
    errors
  end

end
