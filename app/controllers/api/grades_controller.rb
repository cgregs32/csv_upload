class Api::GradesController < ApplicationController
  def index
  end

  def create
    csv = csv_format(params[:file].tempfile)
    count = csv[:row_count].length
    errors = Grade.handle_csv(csv)
    binding.pry
    if errors.any?
      render json: { errors: errors }, status: 422
    else
      render json: { message: ["All #{count} entries successfully uploaded"] }
    end
  end

end
