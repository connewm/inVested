Rails.application.routes.draw do
  get 'main/home'

  get 'main/trending', as: 'trend'

  get 'main/recomended', as: 'rec'

  root to: 'main#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
