require 'csv'
class ApplicationController < ActionController::API

  def csv_format(input)
    csv_text = File.read(input)
    csv = CSV.parse(csv_text, headers: true, header_converters: :symbol)
  end
  
end
