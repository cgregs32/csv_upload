class Api::CoursesController < ApplicationController
  def index
  end

  def create
    csv = csv_format(params[:file].tempfile)
    count = csv[:row_count].length
    errors = Course.handle_csv(csv)
    if errors.any?
      render json: { errors: messages }, status: 422
    else
      render json: { message: ["All #{count} entries successfully uploaded"] }
    end
  end
end
