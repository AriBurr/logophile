class Api::ClubsController < ApiController
  before_action :require_login
  before_action :set_club, only: [:update, :destroy]

  def index
    render json: Club.all
  end

  def create
    club = Club.new(club_params)
    if club.save
      render json: club
    else
      render json: { errors: club.full_messages }, status: 422
    end
  end

  private
    def club_params
      params.require(:club).permit(:name, :description)
    end

    def set_club
      @shelf = current_user.bookshelves.find(params[:id])
    end

end
