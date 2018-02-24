class Api::StudentsController < ApplicationController

  def index
  end

  def create
    csv = csv_format(params[:file].tempfile)
    messages = Student.handle_csv(csv)
    if messages.any?
      render json: { errors: messages }, status: 422
    else
      render json: { message: 'All students uploaded' }
    end
  end

end
