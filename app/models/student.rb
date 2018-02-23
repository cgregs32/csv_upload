class Student < ApplicationRecord
  validates_presence_of :full_name

  has_many :grades
  has_many :courses, through: :grades
end
