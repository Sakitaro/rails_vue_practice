# class TodosController < ApplicationController
#   @@todos_data = [
#     { title: 'これはRails側のデータです', completed: false },
#     { title: 'API経由で取得しています', completed: false },
#     { title: '取得したこれらのデータはstoreに保存します', completed: false },
#     { title: 'Hello World!', completed: false },
#     { title: 'Hoge hoge', completed: false },
#     { title: 'Matcher Inc.', completed: false }
#   ]

#   def index
#     render json: { todos: @@todos_data }
#   end

#   def create
#     new_todo = { title: todo_params[:title], completed: false }
#     @@todos_data << new_todo
#     render json: { todo: new_todo }, status: :created
#   end

#   private

#   def todo_params
#     params.require(:todo).permit(:title, :completed)
#   end  
# end
