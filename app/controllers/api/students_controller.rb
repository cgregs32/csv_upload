class Api::StudentsController < ApplicationController

  def index
    render json: Student.all
  end

  def mass_upload
    csv = csv_format(params[:file].tempfile)
    count = csv[:row_count].length
    messages = Student.handle_csv(csv)
    if messages.any?
      render json: { errors: messages }, status: 422
    else
      render json: { message: ["All #{count} students successfully uploaded"] }
    end
  end

end
