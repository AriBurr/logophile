class Api::ClubsController < ApiController
  before_action :require_login
  before_action :set_club, only: [:show, :update, :destroy]

  def index
    render json: Club.all
  end

  def show
    render json: @club
  end

  def create
    club = Club.new(club_params)
    if club.save
      render json: club
    else
      render json: { errors: club.full_messages }, status: 422
    end
  end

  def update
    if @club.update(club_params)
      render json: @club
    else
      render json: { errors: @club.full_messages }, status: 422
    end
  end

  def destroy
    @club.destroy
  end

  private
    def club_params
      params.require(:club).permit(:name)
    end

    def set_club
      @club = Club.find(params[:id])
    end

end
