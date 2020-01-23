require 'test_helper'

class MainControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get main_home_url
    assert_response :success
  end

  test "should get trending" do
    get main_trending_url
    assert_response :success
  end

  test "should get recomended" do
    get main_recomended_url
    assert_response :success
  end

end
