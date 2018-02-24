require 'csv'
class ApplicationController < ActionController::API

  def csv_format(input, route)
    csv_text = File.read(input)
    csv = CSV.parse(csv_text, headers: true, header_converters: :symbol)
    headers = CSV.parse(csv_text)[0]
    correct_upload?(route, headers) ? csv : false
  end

  private

    def correct_upload?(route, headers)
      case route
        when 'students'
          headers[1] === 'full_name'
        when 'courses'
          headers[1] === 'class_name'
        when 'grades'
          headers[2] === 'grade'
        end
    end

end
