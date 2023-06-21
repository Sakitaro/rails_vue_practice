class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include ApiRendering
  include SessionsHelper

  protect_from_forgery with: :exception

  def not_found
    raise ActionController::RoutingError, 'The API endpoint was not found'
  end
  
end
