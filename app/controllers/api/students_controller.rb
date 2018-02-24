require 'csv'

class Api::StudentsController < ApplicationController
  def index
  end

  def create
    csv_text = File.read(params[:file].tempfile)
    csv = CSV.parse(csv_text, headers: true, header_converters: :symbol)
    errors = Student.handle_csv(csv)
    if errors.any?
      render json: { errors: errors }, status: 422
    else
      render json: { message: 'completed upload' }
    end
  end

  private

    def student_params
      params.require(:student).permit(:full_name)
    end
end
