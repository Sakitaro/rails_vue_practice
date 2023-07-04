class SampleItemsController < ApplicationController
  ITEMS_DATA = [
    { text: 'これはRails側のデータです' },
    { text: 'API経由で取得しています' },
    { text: '取得したこれらのデータはstoreに保存します' },
    { text: 'Hello World!' },
    { text: 'Hoge hoge' },
    { text: 'Matcher Inc.' },
  ]


  def index
    render_success sample_items: ITEMS_DATA
  end

  def create
    puts sample_item_params
    render_success sample_item: { text: sample_item_params[:text] }
  end

  private
  def sample_item_params
    params.require(:sample_item).permit(:text)
  end
end
