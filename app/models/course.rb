class Course < ApplicationRecord
  validates_presence_of :class_name

  has_many :grades
  has_many :students, through: :grades
end
