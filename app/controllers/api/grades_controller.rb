class Api::GradesController < ApplicationController
  def index
  end

  def create
    csv = csv_format(params[:file].tempfile)
    errors = Grade.handle_csv(csv)
  end
end
