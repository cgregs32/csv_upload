class Api::StudentsController < ApplicationController
  def index
  end

  def create
    student = Student.new(student_params)
    binding.pry
    if student.save
      render json: student
    else
      render json: { errors: student.errors.full_messages }, status: 422
    end
  end

  private

    def student_params
      params.require(:student).permit(:full_name)
    end
end
