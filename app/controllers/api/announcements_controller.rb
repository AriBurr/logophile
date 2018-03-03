class Api::AnnouncementsController < ApplicationController
  before_action :set_club, only: [:index, :update]

  def index
    render json: @club.announcement
  end

  def update
    binding.pry
    announcment = @club.announcments
    if announcment.update(announcement_params)
      render json: announcement
    else
      render json: { errors: announcement.errors.full_messages }, status: 422
    end
  end

  private

    def announcement_params
      params.require(:announcement).permit(:body, :club_id)
    end

    def set_club
      @club = Club.find(params[:club_id])
    end

end
