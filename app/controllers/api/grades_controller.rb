class Api::GradesController < ApplicationController

  def index
    render json: Grade.with_user_and_course
  end

  def mass_upload
    csv = csv_format(params[:file].tempfile, params[:route])
    if csv.blank?
      render json: {
        errors: ["Incorrect File: type should be #{params[:route]}"]
      }, status: 422
    else
      count = csv[:row_count].length
      errors = Grade.handle_csv(csv)
      if errors.any?
        render json: { errors: errors }, status: 422
      else
        render json: { message: ["All #{count} entries successfully uploaded"] }
      end
    end
  end

end
