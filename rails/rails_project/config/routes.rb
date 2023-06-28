Rails.application.routes.draw do
  get 'users/create'
  get 'user/create'

  scope :api do
    get '/get_csrf_token', to: 'csrf_tokens#show'

    get '/sample_items', to: 'sample_items#index'
    post '/sample_items', to: 'sample_items#create'

    # Vue x Rails課題
    # ログイン系
    post '/sign_in', to: 'sessions#create'
    delete 'sign_out', to: 'sessions#destroy'    

    post '/sign_up', to: 'users#create'

    # タスク系
    get '/tasks', to: 'tasks#index'
    get '/alltasks', to: 'tasks#all'
    post '/tasks', to:  'tasks#create'
    put '/tasks/:id',to: 'tasks#update'
    
    get '*path', to: 'application#not_found'
  end
end
