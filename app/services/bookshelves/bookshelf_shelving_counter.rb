module Bookshelves
  class BookshelfShelvingCounter
    def initialize(action, bookshelf)
      @action = action
      @bookshelf = bookshelf
    end

    attr_accessor :action, :bookshelf

    def change_count
      case action
      when 'inc'
        bookshelf.update(book_count: bookshelf.book_count += 1)
      when 'dec'
        bookshelf.update(book_count: bookshelf.book_count -= 1)
      end
      bookshelf
    end
  end
end
