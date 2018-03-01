class Api::ReadingsController < ApplicationController
  before_action :set_club

  def create
    reading = @club.readings.new(reading_params)
    if reading.save
      render json: reading
    else
      render json: { errors: reading.errors.full_messages.join(', ')}, status: 422
    end
  end

  private
    def reading_params
      params.require(:reading).permit(:book_id, :club_id)
    end

    def set_club
      @club = Club.find(params[:club_id])
    end
end
