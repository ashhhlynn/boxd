require "test_helper"

class DiaryFilmsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @diary_film = diary_films(:one)
  end

  test "should get index" do
    get diary_films_url
    assert_response :success
  end

  test "should get new" do
    get new_diary_film_url
    assert_response :success
  end

  test "should create diary_film" do
    assert_difference('DiaryFilm.count') do
      post diary_films_url, params: { diary_film: {  } }
    end

    assert_redirected_to diary_film_url(DiaryFilm.last)
  end

  test "should show diary_film" do
    get diary_film_url(@diary_film)
    assert_response :success
  end

  test "should get edit" do
    get edit_diary_film_url(@diary_film)
    assert_response :success
  end

  test "should update diary_film" do
    patch diary_film_url(@diary_film), params: { diary_film: {  } }
    assert_redirected_to diary_film_url(@diary_film)
  end

  test "should destroy diary_film" do
    assert_difference('DiaryFilm.count', -1) do
      delete diary_film_url(@diary_film)
    end

    assert_redirected_to diary_films_url
  end
end
