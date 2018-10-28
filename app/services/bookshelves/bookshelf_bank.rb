module Bookshelves
  class BookshelfBank
    def initialize(inbound, outbound)
      @inbound = inbound
      @outbound = outbound
    end

    attr_accessor :inbound, :outbound

    def call
      return if inbound == outbound
      increment(find_bookshelf(inbound))
      decrement(find_bookshelf(outbound))
    end

    private

    def increment(shelf)
      shelf.update(book_count: shelf.book_count + 1)
    end

    def decrement(shelf)
      shelf.update(book_count: shelf.book_count - 1)
    end

    def find_bookshelf(id)
      @_bookshelf = Bookshelf.find(id)
    end
  end
end
