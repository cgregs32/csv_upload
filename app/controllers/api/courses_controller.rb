class Api::CoursesController < ApplicationController
  def index
  end

  def create
    csv = csv_format(params[:file].tempfile)
    errors = Course.handle_csv(csv)


  end
end
