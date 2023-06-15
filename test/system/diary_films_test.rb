require "application_system_test_case"

class DiaryFilmsTest < ApplicationSystemTestCase
  setup do
    @diary_film = diary_films(:one)
  end

  test "visiting the index" do
    visit diary_films_url
    assert_selector "h1", text: "Diary Films"
  end

  test "creating a Diary film" do
    visit diary_films_url
    click_on "New Diary Film"

    click_on "Create Diary film"

    assert_text "Diary film was successfully created"
    click_on "Back"
  end

  test "updating a Diary film" do
    visit diary_films_url
    click_on "Edit", match: :first

    click_on "Update Diary film"

    assert_text "Diary film was successfully updated"
    click_on "Back"
  end

  test "destroying a Diary film" do
    visit diary_films_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Diary film was successfully destroyed"
  end
end
